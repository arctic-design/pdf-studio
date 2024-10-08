'use client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Studio } from './Studio';
import { SnackbarProvider } from '@arctic-kit/snow';

export function AppStudio() {
  return (
    <DndProvider backend={HTML5Backend}>
      <SnackbarProvider>
        <Studio />
      </SnackbarProvider>
    </DndProvider>
  );
}
