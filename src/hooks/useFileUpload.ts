'use client';

import { useCallback, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDocumentStore } from '../stores/useDocumentStore';
import { createPage } from '../lib/page-model';
import { filterValidFiles } from '../lib/file-validators';
import type { SourceFile } from '../types';
import { toast } from 'sonner';

export function useFileUpload() {
  const addSourceFile = useDocumentStore((s) => s.addSourceFile);
  const addPages = useDocumentStore((s) => s.addPages);
  const setProcessing = useDocumentStore((s) => s.setProcessing);

  const fileReaderWorker = useRef<Worker>();
  const fileConversionWorker = useRef<Worker>();
  const pendingCount = useRef(0);

  useEffect(() => {
    fileConversionWorker.current = new Worker(
      new URL('../workers/FileConversionWorker', import.meta.url),
      { type: 'module' }
    );

    fileConversionWorker.current.onmessage = (e: MessageEvent) => {
      const { pdfBytes, pageCount, pageDimensions, error, uniqueId, fileMetaData } =
        e.data;

      pendingCount.current -= 1;
      if (pendingCount.current === 0) {
        setProcessing(false);
      }

      if (error) {
        toast.error(`Error processing ${fileMetaData.name}: ${error}`);
        return;
      }

      const sourceFile: SourceFile = {
        id: uniqueId,
        originalFile: new File([pdfBytes], fileMetaData.name, {
          type: 'application/pdf',
        }),
        fileName: fileMetaData.name,
        fileSize: pdfBytes.byteLength,
        pageCount,
        pdfBytes,
      };

      addSourceFile(sourceFile);

      const pages = Array.from({ length: pageCount }, (_, i) =>
        createPage(
          uuidv4(),
          uniqueId,
          i,
          pageDimensions[i]?.width ?? 612,
          pageDimensions[i]?.height ?? 792
        )
      );

      addPages(pages);
      toast.success(
        `Added ${pageCount} page${pageCount !== 1 ? 's' : ''} from ${fileMetaData.name}`
      );
    };

    fileReaderWorker.current = new Worker(
      new URL('../workers/FileReaderWorker', import.meta.url),
      { type: 'module' }
    );

    fileReaderWorker.current.onmessage = (e: MessageEvent) => {
      if (e.data.status === 'complete') {
        const { fileMetaData, fileData } = e.data;
        setProcessing(true, `Converting ${fileMetaData.name}...`);

        try {
          const offscreen = new OffscreenCanvas(256, 256);
          const id = uuidv4();
          const finalFile = new File([fileData], fileMetaData.name || id, {
            type: fileMetaData.type,
          });

          fileConversionWorker.current?.postMessage(
            { file: finalFile, uniqueId: id, canvas: offscreen },
            [offscreen]
          );
        } catch (err) {
          toast.error('Error loading file');
          pendingCount.current -= 1;
          if (pendingCount.current === 0) {
            setProcessing(false);
          }
        }
      } else if (e.data.status === 'error') {
        toast.error('Error reading file');
        pendingCount.current -= 1;
        if (pendingCount.current === 0) {
          setProcessing(false);
        }
      }
    };

    fileReaderWorker.current.onerror = () => {
      toast.error('Error reading file');
    };

    return () => {
      fileConversionWorker.current?.terminate();
      fileReaderWorker.current?.terminate();
    };
  }, [addSourceFile, addPages, setProcessing]);

  const uploadFiles = useCallback((files: File[]) => {
    const validFiles = filterValidFiles(files);
    if (validFiles.length === 0) {
      toast.error('No supported files selected');
      return;
    }

    if (validFiles.length < files.length) {
      toast.warning(
        `${files.length - validFiles.length} unsupported file(s) skipped`
      );
    }

    pendingCount.current += validFiles.length;
    setProcessing(true, 'Reading files...');

    validFiles.forEach((file) => {
      fileReaderWorker.current?.postMessage({
        file,
        chunkSize: 1024 * 1024,
      });
    });
  }, [setProcessing]);

  return { uploadFiles };
}
