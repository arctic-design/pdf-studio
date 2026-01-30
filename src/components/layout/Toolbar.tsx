'use client';

import Link from 'next/link';
import {
  RotateCw,
  RotateCcw,
  Trash2,
  Copy,
  Download,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  Search,
  Plus,
  FileText,
  EllipsisVertical,
} from 'lucide-react';
import { ThemeToggle } from '../shared/ThemeToggle';
import { useDocumentStore } from '../../stores/useDocumentStore';
import { useUIStore } from '../../stores/useUIStore';
import { useHistoryStore } from '../../stores/useHistoryStore';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { cn } from '../../lib/cn';

interface ToolbarProps {
  onExport: () => void;
  onUpload: () => void;
}

function IconBtn({
  icon: Icon,
  label,
  onClick,
  disabled,
  shortcut,
  destructive,
  className,
}: {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  disabled?: boolean;
  shortcut?: string;
  destructive?: boolean;
  className?: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onClick}
          disabled={disabled}
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-[3px]',
            'text-toolbar-foreground/50',
            'hover:bg-toolbar-foreground/[0.1] hover:text-toolbar-foreground',
            'disabled:opacity-25 disabled:pointer-events-none',
            destructive && 'hover:text-red-500 dark:hover:text-red-400',
            className,
          )}
        >
          <Icon className="h-4 w-4" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        {label}
        {shortcut && (
          <kbd className="ml-1.5 rounded-sm border border-border/50 bg-muted/50 px-1 py-0.5 font-mono text-[10px]">
            {shortcut}
          </kbd>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

function Divider({ className }: { className?: string }) {
  return <div className={cn('mx-1 h-4 w-px shrink-0 bg-toolbar-foreground/[0.1]', className)} />;
}

function MenuAction({
  icon: Icon,
  label,
  shortcut,
  onClick,
  disabled,
  destructive,
}: {
  icon: React.ElementType;
  label: string;
  shortcut?: string;
  onClick: () => void;
  disabled?: boolean;
  destructive?: boolean;
}) {
  return (
    <DropdownMenuItem
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center gap-2.5 px-2.5 py-1.5 text-[12px]',
        destructive && 'text-red-500 focus:text-red-500 dark:text-red-400 dark:focus:text-red-400',
      )}
    >
      <Icon className="h-3.5 w-3.5 shrink-0 opacity-60" />
      <span className="flex-1">{label}</span>
      {shortcut && (
        <kbd className="ml-3 text-[10px] text-muted-foreground">{shortcut}</kbd>
      )}
    </DropdownMenuItem>
  );
}

export function Toolbar({ onExport, onUpload }: ToolbarProps) {
  const pages = useDocumentStore((s) => s.pages);
  const selectedPageIds = useDocumentStore((s) => s.selectedPageIds);
  const rotatePages = useDocumentStore((s) => s.rotatePages);
  const removePagesById = useDocumentStore((s) => s.removePagesById);
  const duplicatePages = useDocumentStore((s) => s.duplicatePages);

  const sidebarOpen = useUIStore((s) => s.sidebarOpen);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);
  const toolPanelOpen = useUIStore((s) => s.toolPanelOpen);
  const toggleToolPanel = useUIStore((s) => s.toggleToolPanel);
  const zoom = useUIStore((s) => s.zoom);
  const zoomIn = useUIStore((s) => s.zoomIn);
  const zoomOut = useUIStore((s) => s.zoomOut);
  const setCommandPaletteOpen = useUIStore((s) => s.setCommandPaletteOpen);

  const canUndo = useHistoryStore((s) => s.canUndo());
  const canRedo = useHistoryStore((s) => s.canRedo());
  const undo = useHistoryStore((s) => s.undo);
  const redo = useHistoryStore((s) => s.redo);

  const hasSelection = selectedPageIds.size > 0;
  const hasPages = pages.length > 0;
  const selectedIds = Array.from(selectedPageIds);

  const handleUndo = () => {
    const restored = undo();
    if (restored) useDocumentStore.getState().reorderPages(restored);
  };

  const handleRedo = () => {
    const restored = redo();
    if (restored) useDocumentStore.getState().reorderPages(restored);
  };

  return (
    <div className="flex h-12 shrink-0 items-center border-b border-toolbar-foreground/[0.08] bg-toolbar text-toolbar-foreground">
      {/* Left: sidebar + brand */}
      <div className="flex shrink-0 items-center gap-0.5 px-2">
        <IconBtn
          icon={sidebarOpen ? PanelLeftClose : PanelLeftOpen}
          label="Toggle sidebar"
          onClick={toggleSidebar}
        />

        <Divider />

        <Link
          href="/"
          className="mr-1 flex items-center gap-2 rounded-[3px] px-1.5 py-1 hover:bg-toolbar-foreground/[0.07]"
        >
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-blue-600">
            <FileText className="h-3 w-3 text-white" />
          </div>
          <span className="hidden text-[13px] font-medium sm:inline">PDF Studio</span>
        </Link>
      </div>

      {/* Center actions */}
      <div className="flex min-w-0 flex-1 items-center justify-center gap-0.5 px-1">
        {/* Add files — always visible */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={onUpload}
              className="flex h-7 shrink-0 items-center gap-1 rounded-[3px] px-2 text-toolbar-foreground/50 hover:bg-toolbar-foreground/[0.1] hover:text-toolbar-foreground"
            >
              <Plus className="h-3.5 w-3.5" />
              <span className="hidden text-[12px] sm:inline">Add files</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">Upload PDF or images</TooltipContent>
        </Tooltip>

        <Divider />

        {/* Desktop inline editing tools — hidden on mobile */}
        <div className="hidden items-center gap-0.5 md:flex">
          <IconBtn icon={Undo2} label="Undo" shortcut="⌘Z" onClick={handleUndo} disabled={!canUndo} />
          <IconBtn icon={Redo2} label="Redo" shortcut="⌘Y" onClick={handleRedo} disabled={!canRedo} />

          <Divider />

          <IconBtn icon={RotateCcw} label="Rotate left" onClick={() => rotatePages(selectedIds, -90)} disabled={!hasSelection} />
          <IconBtn icon={RotateCw} label="Rotate right" shortcut="R" onClick={() => rotatePages(selectedIds, 90)} disabled={!hasSelection} />
          <IconBtn icon={Copy} label="Duplicate" shortcut="D" onClick={() => duplicatePages(selectedIds)} disabled={!hasSelection} />
          <IconBtn icon={Trash2} label="Delete" shortcut="Del" onClick={() => removePagesById(selectedIds)} disabled={!hasSelection} destructive />

          <Divider />

          <IconBtn icon={ZoomOut} label="Zoom out" shortcut="−" onClick={zoomOut} />
          <span className="hidden min-w-[2.75rem] select-none text-center text-[12px] tabular-nums text-toolbar-foreground/50 lg:inline">
            {zoom}%
          </span>
          <IconBtn icon={ZoomIn} label="Zoom in" shortcut="+" onClick={zoomIn} />

          <Divider />
        </div>

        {/* Mobile overflow menu — visible only on small screens */}
        <div className="flex md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[3px] text-toolbar-foreground/50 hover:bg-toolbar-foreground/[0.1] hover:text-toolbar-foreground">
                <EllipsisVertical className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="min-w-[180px]">
              <MenuAction icon={Undo2} label="Undo" shortcut="⌘Z" onClick={handleUndo} disabled={!canUndo} />
              <MenuAction icon={Redo2} label="Redo" shortcut="⌘Y" onClick={handleRedo} disabled={!canRedo} />
              <DropdownMenuSeparator />
              <MenuAction icon={RotateCcw} label="Rotate left" onClick={() => rotatePages(selectedIds, -90)} disabled={!hasSelection} />
              <MenuAction icon={RotateCw} label="Rotate right" shortcut="R" onClick={() => rotatePages(selectedIds, 90)} disabled={!hasSelection} />
              <MenuAction icon={Copy} label="Duplicate" shortcut="D" onClick={() => duplicatePages(selectedIds)} disabled={!hasSelection} />
              <MenuAction icon={Trash2} label="Delete" shortcut="Del" onClick={() => removePagesById(selectedIds)} disabled={!hasSelection} destructive />
              <DropdownMenuSeparator />
              <MenuAction icon={ZoomOut} label="Zoom out" shortcut="−" onClick={zoomOut} />
              <MenuAction icon={ZoomIn} label="Zoom in" shortcut="+" onClick={zoomIn} />
            </DropdownMenuContent>
          </DropdownMenu>

          <Divider />
        </div>

        {/* Export — always visible */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              disabled={!hasPages}
              onClick={onExport}
              className={cn(
                'flex h-7 shrink-0 items-center gap-1.5 rounded-[3px] px-2.5',
                'bg-blue-600 text-[12px] font-medium text-white',
                'hover:bg-blue-500',
                'disabled:opacity-30 disabled:pointer-events-none',
              )}
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs">Download PDF</TooltipContent>
        </Tooltip>
      </div>

      {/* Right: ⌘K + layout toggles */}
      <div className="flex shrink-0 items-center gap-0.5 px-2">
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className={cn(
            'hidden h-7 items-center gap-1.5 rounded-[3px] px-2 lg:flex',
            'border border-toolbar-foreground/[0.1] text-toolbar-foreground/40',
            'hover:bg-toolbar-foreground/[0.07] hover:text-toolbar-foreground/60',
          )}
        >
          <Search className="h-3 w-3" />
          <kbd className="inline-flex items-center gap-[3px] rounded-sm border border-toolbar-foreground/[0.12] bg-toolbar-foreground/[0.06] px-1.5 py-0.5 text-[11px] font-medium text-toolbar-foreground/50">
            <span className="text-[14px] leading-none">⌘</span><span className="leading-none">K</span>
          </kbd>
        </button>

        <Divider className="hidden lg:block" />

        <IconBtn
          icon={toolPanelOpen ? PanelRightClose : PanelRightOpen}
          label="Toggle tools"
          onClick={toggleToolPanel}
        />
        <ThemeToggle />
      </div>
    </div>
  );
}
