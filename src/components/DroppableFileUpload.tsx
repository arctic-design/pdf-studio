import { FileUpload } from '@arctic-kit/snow';
import { css } from '@pigment-css/react';
import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';

const supportedFileTypes = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/tiff',
  'image/tif',
];
type DroppableFileUploadProps = {
  onUploadFiles: (files: File[]) => void;
};

const DroppableStyle = css({
  '@media (min-width: 1012px)': {
    height: 160,
  },
});

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noOp = () => {};

const DroppableFileUpload: React.FC<DroppableFileUploadProps> = ({
  onUploadFiles,
}) => {
  const handleFileDrop = useCallback(
    (item: { files: File[] }) => {
      const supportedFiles = item.files.filter((file) =>
        supportedFileTypes.includes(file.type)
      );
      if (supportedFiles.length > 0) {
        onUploadFiles(supportedFiles);
      }
    },
    [onUploadFiles]
  );

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item: { files: File[] }) {
        if (item.files && item.files.length) {
          handleFileDrop(item);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [handleFileDrop]
  );

  const isActive = canDrop && isOver;

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    onUploadFiles(files);
  };

  return (
    <FileUpload
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={drop as any}
      value={null}
      onChange={(event) => onChangeHandler(event)}
      accept="application/pdf,image/jpeg,image/png,image/tiff,image/x-tiff"
      onClear={noOp}
      label="Drag your files here to upload or..."
      footerLabel="Only supports .pdf, .jpg, .png, .tif"
      isActive={isActive}
      className={DroppableStyle}
      multiple
    />
  );
};

export { DroppableFileUpload };
