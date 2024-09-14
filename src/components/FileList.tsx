import {
  Box,
  Checkbox,
  Tooltip,
  IconButton,
  ActionMenu,
  ActionMenuItem,
} from '@arctic-kit/snow';
import { useCallback } from 'react';

import { DraggableFile } from './DraggableFile';
import { CheckedFileType, RedactFile } from './types';
import { ItemTypes } from './types';
import { styled } from '@pigment-css/react';
import { EllipsisVerticalIcon, EyeIcon } from '@arctic-kit/icons';

const RowContainer = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: `1px solid var(--snow-colors-grey-400)`,
  borderBottom: 'none',
  '&:last-child': {
    borderBottom: `1px solid var(--snow-colors-grey-400)`,
  },
  padding: '8px 12px',
  '.icon-button': {
    display: 'none',
  },
  "&[aria-selected='true']": {
    backgroundColor: 'var(--snow-colors-grey-100)',
  },
  '&:hover': {
    backgroundColor: 'var(--snow-colors-grey-300)',
    '.icon-button': {
      display: 'flex',
    },
  },
}));

const ActionContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 8,
});

type FileListProps = {
  files: RedactFile[];
  selectedFileId?: string;
  onAction?: (action: 'view' | 'edit' | 'delete', fileId: string) => void;
  moveFile: (dragIndex: number, hoverIndex: number) => void;
  onCheckedChange: (id: string, value: boolean) => void;
  checkedFiles: CheckedFileType;
};

export function FileList(props: FileListProps) {
  const {
    files,
    selectedFileId,
    onAction,
    moveFile,
    checkedFiles,
    onCheckedChange,
  } = props;

  const moveCard = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      moveFile(dragIndex, hoverIndex);
    },
    [moveFile]
  );

  const renderCard = useCallback(
    (card: { id: string; children: React.ReactNode }, index: number) => {
      return (
        <DraggableFile
          key={card.id}
          index={index}
          id={card.id}
          moveCard={moveCard}
          accept={ItemTypes.File}
        >
          {card.children}
        </DraggableFile>
      );
    },
    [moveCard]
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: 16 }}>
      {files.map((file, i) =>
        renderCard(
          {
            id: file.id,
            children: (
              <>
                <RowContainer
                  key={file.id}
                  aria-selected={selectedFileId === file.id}
                >
                  <Checkbox
                    onChange={(value) => onCheckedChange(file.id, value)}
                    name={file.id}
                    label={file.originalFile.name}
                    checked={checkedFiles[file.id]}
                  />
                  <ActionContainer>
                    <Tooltip message="Jump to file">
                      <IconButton
                        size="small"
                        className="icon-button"
                        onClick={() => onAction?.('view', file.id)}
                      >
                        <EyeIcon />
                      </IconButton>
                    </Tooltip>
                    <ActionMenu
                      placement="bottom-end"
                      renderContent={<EllipsisVerticalIcon />}
                    >
                      <ActionMenuItem
                        label="View"
                        onClick={() => onAction?.('view', file.id)}
                      />
                      <ActionMenuItem
                        label="Edit"
                        onClick={() => onAction?.('edit', file.id)}
                      />
                      <ActionMenuItem
                        color="error"
                        label="Delete"
                        onClick={() => onAction?.('delete', file.id)}
                      />
                    </ActionMenu>
                  </ActionContainer>
                </RowContainer>
              </>
            ),
          },
          i
        )
      )}
    </Box>
  );
}
