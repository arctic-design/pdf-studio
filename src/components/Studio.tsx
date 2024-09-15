import {
  Box,
  IconButton,
  Modal,
  Switch,
  Tooltip,
  useSnackbar,
  ConfirmationModal,
  Grid,
  GridRow,
  GridColumn,
} from '@arctic-kit/snow';
import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FileList } from './FileList';
import { CheckedFileType, RedactFile } from './types';
import update from 'immutability-helper';
import { LoadingOverlay } from './LoadingOverlay';
import { TimerService } from '../services/TimerService';
import { DroppableFileUpload } from './DroppableFileUpload';
import { styled } from '@pigment-css/react';
import {
  DocumentIcon,
  TrashIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
} from '@arctic-kit/icons';

const Container = styled.div({
  height: 'calc(100% - var(--header-height))',
  display: 'flex',
  flex: 1,
});

const CapabilityPanel = styled.div({
  height: '100%',
  transition: 'all 0.25s ease',
  backgroundColor: 'var(--snow-colors-neutral-0)',
  display: 'flex',
  flexDirection: 'column',
  padding: 8,
  button: {
    display: 'block',
  },
});

const CapabilityPanelColumn = styled(GridColumn)({
  '@media (max-width: 1012px)': {
    maxHeight: '40%',
    overflowY: 'auto',
  },
});

const CanvasPanelColumn = styled(GridColumn)({
  '@media (max-width: 1012px)': {
    minHeight: '60%',
  },
});

const CanvasPanel = styled.div({
  backgroundColor: 'var(--canvas-panel-bg)',
  flex: 1,
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
});

const EmptyContainer = styled.div({
  backgroundColor: 'var(--canvas-panel-bg)',
  color: 'var(--snow-colors-white)',
  display: 'flex',
  padding: '24px 32px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 8,
  borderRadius: 4,
  border: '1px solid var(--snow-colors-grey-800)',
  svg: {
    color: 'var(--snow-colors-white)',
    fontSize: 20,
  },
});

const FrameContainer = styled.iframe<{ showFrame?: boolean }>({
  width: 'calc(100% - 40px)',
  margin: 20,
  display: 'none',
  height: '100%',
  variants: [
    {
      props: { showFrame: true },
      style: {
        display: 'block',
      },
    },
  ],
});

type ViewModeType = 'pdfjs' | 'default';
type ConfirmModalDataType = {
  show: boolean;
  text: string;
  fileId: string;
  deleteSelected?: boolean;
};

const InitialConfirmModalData = {
  show: false,
  text: '',
  fileId: '',
  deleteSelected: false,
};

export function Studio() {
  const [allFiles, setAllFiles] = useState<RedactFile[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string>();
  const [viewMode, setViewMode] = useState<ViewModeType>('default');
  const [checkedFiles, setCheckedFiles] = useState<CheckedFileType>({});
  const [showPreviewBundleModal, setShowPreviewBundleModal] = useState(false);
  const [mergedPdfUrl, setMergedPdfUrl] = useState<string | null>(null);
  const [confirmModalData, setConfirmModalData] =
    useState<ConfirmModalDataType>(InitialConfirmModalData);

  const [loading, setLoading] = useState<{ text: string; show: boolean }>({
    text: 'Processing...',
    show: false,
  });

  const previewFrameRef = useRef<HTMLIFrameElement>(null);
  const previewBundleFrameRef = useRef<HTMLIFrameElement>(null);
  const _fileReaderWorker = useRef<Worker>();
  const _fileProcessingWorker = useRef<Worker>();
  const _fileMergeWorker = useRef<Worker>();
  const _numberOfFilesProcessed = useRef<number>(0);

  const { enqueueSnackbar } = useSnackbar();

  const updateFrameSrc = useCallback((blobUrl: string, mode: ViewModeType) => {
    if (previewFrameRef.current) {
      previewFrameRef.current.src =
        mode === 'pdfjs' ? `/pdfjs/web/viewer.html?file=${blobUrl}` : blobUrl;
    }
  }, []);

  const onMultipleFileUpload = useCallback((files: File[]) => {
    if (files && files.length > 0) {
      _numberOfFilesProcessed.current = files.length;
      setLoading({ text: 'Reading file...', show: true }); // Start loading
      files.forEach((file: File) => {
        // Set the start time and start reading the file
        TimerService.setMarkStart(`${file.name}:file-read`);

        // Start reading the file in chunks
        _fileReaderWorker.current?.postMessage({
          file,
          chunkSize: 1024 * 1024,
        }); // 1MB chunk size
      });
    }
  }, []);

  useEffect(() => {
    _fileProcessingWorker.current = new Worker(
      new URL('./FileConversionWorker', import.meta.url),
      {
        type: 'module',
      }
    );

    _fileProcessingWorker.current.onmessage = (e: MessageEvent) => {
      const { uploadedFile, blobUrl, errorMessage, fileMetaData } = e.data;

      TimerService.setMarkEnd(`${fileMetaData.name}:file-processing`);
      _numberOfFilesProcessed.current -= 1;
      if (_numberOfFilesProcessed.current === 0) {
        setLoading({ text: '', show: false }); // Stop loading
      }

      if (errorMessage) {
        enqueueSnackbar({
          variant: 'error',
          message: errorMessage,
        });
      } else {
        setAllFiles((prev) => [
          {
            ...uploadedFile,
          },
          ...prev,
        ]);
        updateFrameSrc(blobUrl, viewMode);
        setSelectedFileId(uploadedFile.id);
        setCheckedFiles((prev) => ({ ...prev, [uploadedFile.id]: true }));
      }
    };

    _fileReaderWorker.current = new Worker(
      new URL('./FileReaderWorker', import.meta.url),
      {
        type: 'module',
      }
    );

    _fileReaderWorker.current.onmessage = (e) => {
      if (e.data.status === 'complete') {
        const { fileMetaData, fileData } = e.data;
        TimerService.setMarkEnd(`${fileMetaData.name}:file-read`);
        setLoading({ text: 'Processing file...', show: true }); // Start loading
        try {
          const offscreen = new OffscreenCanvas(256, 256);
          const id = uuidv4();

          // Convert ArrayBuffer to File
          const finalFile = new File([fileData], fileMetaData.name || id, {
            type: fileMetaData.type,
          });

          // Set the start time and start reading the file
          TimerService.setMarkStart(`${fileMetaData.name}:file-processing`);

          _fileProcessingWorker.current?.postMessage(
            { file: finalFile, uniqueId: id, canvas: offscreen },
            [offscreen]
          );
        } catch (error) {
          console.error('Error loading PDF:', error);

          enqueueSnackbar({
            variant: 'error',
            message: 'Error loading PDF',
          });
        } finally {
          // setLoading(false); // Stop loading
        }
      } else if (e.data.status === 'error') {
        console.error('Error reading file:', e.data.error);
      }
    };

    _fileReaderWorker.current.onerror = (e) => {
      console.error('FileReaderWorker error:', e);
      enqueueSnackbar({
        variant: 'error',
        message: 'Error reading file',
      });
    };

    _fileMergeWorker.current = new Worker(
      new URL('./FileMergeWorker.ts', import.meta.url),
      {
        type: 'module',
      }
    );

    _fileMergeWorker.current.onmessage = (e) => {
      const { blobUrl, errorMessage } = e.data;
      setLoading({ text: '', show: false }); // Start loading

      if (!errorMessage) {
        const pdfUrl =
          viewMode === 'pdfjs'
            ? `/pdfjs/web/viewer.html?file=${blobUrl}`
            : blobUrl;
        setShowPreviewBundleModal(true);

        setMergedPdfUrl(pdfUrl);
      } else {
        enqueueSnackbar({
          variant: 'error',
          message: errorMessage,
        });
      }
    };

    return () => {
      _fileProcessingWorker.current?.terminate();
      _fileReaderWorker.current?.terminate();
      _fileMergeWorker.current?.terminate();
    };
  }, [viewMode, enqueueSnackbar, updateFrameSrc]);

  const onViewAction = async (fileId: string) => {
    if (fileId !== selectedFileId) {
      setSelectedFileId(fileId);
      const selectedRedactFile = allFiles.find((file) => file.id === fileId);
      if (selectedRedactFile) {
        const blobUrl = URL.createObjectURL(selectedRedactFile.originalFile);

        updateFrameSrc(blobUrl, viewMode);
      }
    }
  };

  const onConfirmDelete = () => {
    const { fileId, deleteSelected } = confirmModalData;
    if (deleteSelected) {
      onRemoveSelectedFiles();
    } else {
      const updatedFiles = allFiles.filter((file) => file.id !== fileId);
      setAllFiles(updatedFiles);
      setSelectedFileId(updatedFiles[0]?.id);
      const updatedCheckedFiles = { ...checkedFiles };
      delete updatedCheckedFiles[fileId];
      setCheckedFiles(updatedCheckedFiles);

      if (updatedFiles.length > 0) {
        onViewAction(updatedFiles[0].id);
      } else {
        setSelectedFileId(undefined);
      }
    }

    enqueueSnackbar('File(s) deleted');
  };

  const onActionHandler = (
    action: 'view' | 'edit' | 'delete',
    fileId: string
  ) => {
    if (action === 'delete') {
      const fileToDelete = allFiles.find((file) => file.id === fileId);
      setConfirmModalData({
        show: true,
        text: `Permanantently delete ${fileToDelete?.originalFile.name}?`,
        fileId,
      });
    } else if (action === 'view') {
      onViewAction(fileId);
    }
  };

  const onMoveFile = useCallback((dragIndex: number, hoverIndex: number) => {
    setAllFiles((prevCards: RedactFile[]) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex] as RedactFile],
        ],
      })
    );
  }, []);

  const onCheckedChangeHandler = (id: string, value: boolean) => {
    setCheckedFiles({ ...checkedFiles, [id]: value });
  };

  const onPreviewBundle = async () => {
    const selectedFiles = allFiles.filter((file) => checkedFiles[file.id]);
    if (selectedFiles.length > 0) {
      setLoading({ text: 'Preparing preview...', show: true }); // Start loading
      _fileMergeWorker.current?.postMessage({
        files: selectedFiles.map((file) => file.originalFile),
      });
    } else {
      enqueueSnackbar({
        variant: 'error',
        message: 'Please select at least one file to preview',
      });
    }
  };

  const onDeleteSelectedFilesAction = () => {
    setConfirmModalData({
      show: true,
      text: `Permanantently delete selected files?`,
      fileId: '',
      deleteSelected: true,
    });
  };

  const onRemoveSelectedFiles = () => {
    const updatedFiles = allFiles.filter((file) => !checkedFiles[file.id]);
    setAllFiles(updatedFiles);
    setSelectedFileId(updatedFiles[0]?.id);
    setCheckedFiles({});
    if (updatedFiles.length > 0) {
      onViewAction(updatedFiles[0].id);
    } else {
      setSelectedFileId(undefined);
    }

    setConfirmModalData({ ...InitialConfirmModalData, show: false });
  };

  const onModalOpenChange = (open: boolean) => {
    setShowPreviewBundleModal(open);
    // Cleanup: revoke the blob URL to free up resources
    if (mergedPdfUrl) {
      URL.revokeObjectURL(mergedPdfUrl);
      setMergedPdfUrl(null);
    }
  };

  const onToggleAll = () => {
    const allChecked = Object.keys(checkedFiles).every(
      (file) => checkedFiles[file]
    );
    const updatedCheckedFiles = allFiles.reduce((acc, file) => {
      acc[file.id] = !allChecked;
      return acc;
    }, {} as CheckedFileType);
    setCheckedFiles(updatedCheckedFiles);
  };

  const onPdfModeToggle = () => {
    const updatedViewMode = viewMode === 'pdfjs' ? 'default' : 'pdfjs';
    setViewMode(updatedViewMode);
    if (allFiles.length > 0) {
      const selectedRedactFile = allFiles.find(
        (file) => file.id === selectedFileId
      );
      if (selectedRedactFile) {
        const blobUrl = URL.createObjectURL(selectedRedactFile.originalFile);
        updateFrameSrc(blobUrl, updatedViewMode);
      }
    }
  };

  const selectedFileCount = Object.keys(checkedFiles).filter(
    (file) => checkedFiles[file]
  ).length;

  const showPdfActions = !showPreviewBundleModal && allFiles.length > 0;

  return (
    <Container>
      <Grid style={{ display: 'flex', padding: 0 }}>
        <GridRow style={{ flex: 1 }}>
          <CapabilityPanelColumn md={12} lg={4}>
            <CapabilityPanel>
              <DroppableFileUpload
                onUploadFiles={(files) => onMultipleFileUpload(files)}
              />

              <Box
                sx={{
                  borderTop: '0.5px solid grey',
                }}
              >
                <Box
                  sx={{
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 12,
                    marginBlock: 12,
                  }}
                >
                  <Box as="span">Documents</Box>
                  <Switch
                    label="Use PDF.Js Viewer"
                    checked={viewMode === 'pdfjs'}
                    onToggle={() => {
                      onPdfModeToggle();
                    }}
                  />
                </Box>
                {showPdfActions && (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      gap: 12,
                      padding: 8,
                    }}
                  >
                    {selectedFileCount > 0 && (
                      <>
                        <Tooltip
                          message={`Preview ${selectedFileCount} selected file bundle`}
                        >
                          <IconButton onClick={onPreviewBundle}>
                            <DocumentIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip
                          message={`Delete ${selectedFileCount} selected file(s)`}
                        >
                          <IconButton onClick={onDeleteSelectedFilesAction}>
                            <TrashIcon />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}

                    <Tooltip message={'Toggle All'}>
                      <IconButton onClick={onToggleAll}>
                        <AdjustmentsHorizontalIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                )}

                <Box>
                  <FileList
                    selectedFileId={selectedFileId}
                    files={allFiles}
                    onAction={onActionHandler}
                    moveFile={onMoveFile}
                    onCheckedChange={onCheckedChangeHandler}
                    checkedFiles={checkedFiles}
                  />
                </Box>
              </Box>
            </CapabilityPanel>
          </CapabilityPanelColumn>
          <CanvasPanelColumn md={12} lg={8}>
            <CanvasPanel>
              {allFiles.length === 0 && (
                <EmptyContainer>
                  <XMarkIcon />
                  <Box sx={{ fontWeight: 500, fontSize: 14 }}>
                    No files uploaded yet
                  </Box>
                  <Box sx={{ fontWeight: 400, fontSize: 14 }}>
                    There are no files to display. Once a file is added, it will
                    be shown here.
                  </Box>
                  <Box sx={{ fontWeight: 400, fontSize: 14 }}>
                    Upload your first file on the left.
                  </Box>
                </EmptyContainer>
              )}
              <FrameContainer
                ref={previewFrameRef}
                id="pdfFrameWithFile"
                showFrame={allFiles.length > 0}
                title="Redacted PDF"
              />
            </CanvasPanel>
          </CanvasPanelColumn>
        </GridRow>
      </Grid>

      <Modal
        open={showPreviewBundleModal}
        onOpenChange={(open) => onModalOpenChange(open)}
        cancelLabel="Close"
        onCancel={() => onModalOpenChange(false)}
      >
        <Box
          sx={{ width: 'calc(100vw - 60px)', height: 'calc(100vh - 200px)' }}
        >
          <iframe
            ref={previewBundleFrameRef}
            id="pdfPreviewBundleFrameWithFile"
            style={{ width: '100%', height: '100%' }}
            title="Preview bundel Redacted PDF"
            src={mergedPdfUrl || ''}
          />
        </Box>
      </Modal>
      <ConfirmationModal
        open={confirmModalData.show}
        onOpenChange={(value) =>
          setConfirmModalData({ ...InitialConfirmModalData, show: value })
        }
        onAction={() => onConfirmDelete()}
        title="Delete File"
        size="medium"
      >
        {confirmModalData.text}
      </ConfirmationModal>
      {loading.show && <LoadingOverlay>{loading.text}</LoadingOverlay>}
    </Container>
  );
}
