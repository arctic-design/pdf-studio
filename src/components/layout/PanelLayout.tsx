'use client';

import { cn } from '../../lib/cn';
import { useUIStore } from '../../stores/useUIStore';

interface PanelLayoutProps {
  sidebar: React.ReactNode;
  canvas: React.ReactNode;
  toolPanel: React.ReactNode;
}

export function PanelLayout({ sidebar, canvas, toolPanel }: PanelLayoutProps) {
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const toolPanelOpen = useUIStore((s) => s.toolPanelOpen);
  const setSidebarOpen = useUIStore((s) => s.setSidebarOpen);
  const setToolPanelOpen = useUIStore((s) => s.setToolPanelOpen);

  return (
    <div className="relative flex flex-1 overflow-hidden">
      {/* Mobile backdrop */}
      {(sidebarOpen || toolPanelOpen) && (
        <div
          className="absolute inset-0 z-10 bg-black/40 md:hidden"
          onClick={() => {
            setSidebarOpen(false);
            setToolPanelOpen(false);
          }}
        />
      )}

      {/* Left sidebar - page thumbnails */}
      {/* Desktop: inline, Mobile: overlay */}
      <div
        className={cn(
          'flex-shrink-0 overflow-hidden border-r border-border/40 bg-sidebar transition-all duration-300 ease-in-out',
          // Mobile: absolute overlay
          'absolute inset-y-0 left-0 z-20 md:relative md:z-auto',
          sidebarOpen ? 'w-56' : 'w-0 border-r-0'
        )}
      >
        {sidebarOpen && (
          <div className="h-full w-56">
            {sidebar}
          </div>
        )}
      </div>

      {/* Center canvas */}
      <div className="relative flex-1 overflow-hidden bg-canvas">
        {canvas}
      </div>

      {/* Right tool panel */}
      {/* Desktop: inline, Mobile: overlay */}
      <div
        className={cn(
          'flex-shrink-0 overflow-hidden border-l border-border/40 bg-sidebar transition-all duration-300 ease-in-out',
          // Mobile: absolute overlay
          'absolute inset-y-0 right-0 z-20 md:relative md:z-auto',
          toolPanelOpen ? 'w-72' : 'w-0 border-l-0'
        )}
      >
        {toolPanelOpen && (
          <div className="h-full w-72">
            {toolPanel}
          </div>
        )}
      </div>
    </div>
  );
}
