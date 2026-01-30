'use client';

import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Button } from '../ui/button';
import { useUIStore } from '../../stores/useUIStore';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../ui/tooltip';

export function ZoomControls() {
  const zoom = useUIStore((s) => s.zoom);
  const zoomIn = useUIStore((s) => s.zoomIn);
  const zoomOut = useUIStore((s) => s.zoomOut);
  const resetZoom = useUIStore((s) => s.resetZoom);

  return (
    <div className="absolute bottom-4 right-4 z-10 flex items-center gap-0.5 rounded-xl border border-border/40 bg-background/90 p-1 shadow-lg shadow-black/5 backdrop-blur-md dark:bg-background/80 dark:shadow-black/20">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={zoomOut}
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">Zoom out</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={resetZoom}
            className="min-w-[3.5rem] rounded-lg px-2 py-1.5 text-center text-xs font-semibold tabular-nums text-foreground/80 transition-colors hover:bg-muted/50 hover:text-foreground"
          >
            {zoom}%
          </button>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">Reset zoom</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={zoomIn}
            className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">Zoom in</TooltipContent>
      </Tooltip>
    </div>
  );
}
