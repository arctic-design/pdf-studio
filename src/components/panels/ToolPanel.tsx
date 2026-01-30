'use client';

import { useDocumentStore } from '../../stores/useDocumentStore';
import { DocumentInfo } from './DocumentInfo';
import { WatermarkPanel } from './WatermarkPanel';
import { PageNumberPanel } from './PageNumberPanel';
import { CompressPanel } from './CompressPanel';
import { PasswordPanel } from './PasswordPanel';
import { ExportPanel } from './ExportPanel';
import {
  Info,
  Droplets,
  Hash,
  Minimize2,
  Lock,
  Download,
} from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '../../lib/cn';
import type { WatermarkConfig, PageNumberConfig } from '../../types';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../ui/tooltip';

const tools = [
  { id: 'document-info' as const, icon: Info, label: 'Document Info' },
  { id: 'watermark' as const, icon: Droplets, label: 'Watermark' },
  { id: 'page-numbers' as const, icon: Hash, label: 'Page Numbers' },
  { id: 'compress' as const, icon: Minimize2, label: 'Compress' },
  { id: 'password' as const, icon: Lock, label: 'Password' },
  { id: 'export' as const, icon: Download, label: 'Export' },
];

export function ToolPanel() {
  const activeTool = useDocumentStore((s) => s.activeTool);
  const setActiveTool = useDocumentStore((s) => s.setActiveTool);
  const setWatermarkConfig = useDocumentStore((s) => s.setWatermarkConfig);
  const setPageNumberConfig = useDocumentStore((s) => s.setPageNumberConfig);

  const activeToolData = tools.find((t) => t.id === activeTool);

  const handleWatermark = (config: WatermarkConfig) => {
    setWatermarkConfig(config);
    toast.success('Watermark saved — it will be included on export');
  };

  const handlePageNumbers = (config: PageNumberConfig) => {
    setPageNumberConfig(config);
    toast.success('Page numbers saved — they will be included on export');
  };

  const handleCompress = (quality: number) => {
    toast.info(`Compression at ${quality}% quality will be applied on export`);
  };

  const handlePassword = (userPassword: string, ownerPassword: string) => {
    toast.info('Password protection will be applied on export');
  };

  return (
    <div className="flex h-full">
      {/* Content area */}
      <div className="flex flex-1 flex-col overflow-hidden border-r border-border/40">
        {/* Section header — VS Code uppercase style */}
        <div className="flex h-9 shrink-0 items-center px-3">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground/60">
            {activeToolData ? activeToolData.label : 'Tools'}
          </span>
        </div>

        {/* Panel content */}
        <ScrollArea className="flex-1">
          {activeTool === 'document-info' && <DocumentInfo />}
          {activeTool === 'watermark' && (
            <WatermarkPanel onApply={handleWatermark} />
          )}
          {activeTool === 'page-numbers' && (
            <PageNumberPanel onApply={handlePageNumbers} />
          )}
          {activeTool === 'compress' && (
            <CompressPanel onApply={handleCompress} />
          )}
          {activeTool === 'password' && (
            <PasswordPanel onApply={handlePassword} />
          )}
          {activeTool === 'export' && <ExportPanel />}

          {/* Empty state */}
          {!activeTool && (
            <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
              <p className="text-[12px] text-foreground/30">
                Select a tool from the sidebar
              </p>
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Activity bar — VS Code icon strip */}
      <div className="flex w-11 shrink-0 flex-col items-center gap-0.5 bg-sidebar py-1.5">
        {tools.map((tool) => {
          const isActive = activeTool === tool.id;
          return (
            <Tooltip key={tool.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setActiveTool(tool.id)}
                  className={cn(
                    'relative flex h-10 w-10 items-center justify-center rounded-[3px]',
                    isActive
                      ? 'text-foreground'
                      : 'text-foreground/35 hover:text-foreground/70',
                  )}
                >
                  {/* Active indicator — left blue bar */}
                  {isActive && (
                    <div className="absolute left-0 top-1.5 h-5 w-0.5 rounded-r-full bg-blue-500" />
                  )}
                  <tool.icon className="h-[18px] w-[18px]" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" className="text-xs">
                {tool.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
