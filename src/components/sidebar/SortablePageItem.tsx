'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PageThumbnail } from './PageThumbnail';
import type { PdfPage } from '../../types';

interface SortablePageItemProps {
  page: PdfPage;
  index: number;
  isSelected: boolean;
  isActive: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export function SortablePageItem({
  page,
  index,
  isSelected,
  isActive,
  onClick,
}: SortablePageItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: page.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <PageThumbnail
        page={page}
        index={index}
        isSelected={isSelected}
        isActive={isActive}
        onClick={onClick}
      />
    </div>
  );
}
