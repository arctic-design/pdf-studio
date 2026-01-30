'use client';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDocumentStore } from '../../stores/useDocumentStore';
import { useHistoryStore } from '../../stores/useHistoryStore';
import { usePageSelection } from '../../hooks/usePageSelection';
import { SortablePageItem } from './SortablePageItem';
import { ScrollArea } from '../ui/scroll-area';

export function PageThumbnailList() {
  const pages = useDocumentStore((s) => s.pages);
  const selectedPageIds = useDocumentStore((s) => s.selectedPageIds);
  const activePageId = useDocumentStore((s) => s.activePageId);
  const reorderPages = useDocumentStore((s) => s.reorderPages);
  const pushState = useHistoryStore((s) => s.pushState);
  const { handlePageClick } = usePageSelection();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = pages.findIndex((p) => p.id === active.id);
    const newIndex = pages.findIndex((p) => p.id === over.id);

    if (oldIndex !== -1 && newIndex !== -1) {
      pushState(pages);
      const newPages = [...pages];
      const [moved] = newPages.splice(oldIndex, 1);
      newPages.splice(newIndex, 0, moved);
      reorderPages(newPages);
    }
  };

  if (pages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-4 text-center text-xs text-muted-foreground">
        No pages yet
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={pages.map((p) => p.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-1">
              {pages.map((page, index) => (
                <SortablePageItem
                  key={page.id}
                  page={page}
                  index={index}
                  isSelected={selectedPageIds.has(page.id)}
                  isActive={activePageId === page.id}
                  onClick={(e) => handlePageClick(page.id, e)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </ScrollArea>
  );
}
