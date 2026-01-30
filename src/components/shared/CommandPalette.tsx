'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '../ui/dialog';
import { useUIStore } from '../../stores/useUIStore';
import { useDocumentStore } from '../../stores/useDocumentStore';
import { useHistoryStore } from '../../stores/useHistoryStore';
import {
  Search,
  FileUp,
  Download,
  Undo2,
  Redo2,
  CheckSquare,
  RotateCw,
  RotateCcw,
  Copy,
  Trash2,
  ZoomIn,
  ZoomOut,
  RotateCcwSquare,
  PanelLeft,
  PanelRight,
  Droplets,
  Hash,
  Minimize2,
  Lock,
  Info,
} from 'lucide-react';
import { cn } from '../../lib/cn';

interface CommandPaletteProps {
  onUpload?: () => void;
}

interface Command {
  id: string;
  category: string;
  label: string;
  icon: React.ElementType;
  shortcut?: string;
  action: () => void;
}

const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
const mod = isMac ? '⌘' : 'Ctrl+';

export function CommandPalette({ onUpload }: CommandPaletteProps) {
  const { commandPaletteOpen, setCommandPaletteOpen } = useUIStore();
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands: Command[] = useMemo(() => [
    // File
    {
      id: 'upload',
      category: 'File',
      label: 'Upload files',
      icon: FileUp,
      action: () => onUpload?.(),
    },
    {
      id: 'export',
      category: 'File',
      label: 'Export PDF',
      icon: Download,
      action: () => {
        useDocumentStore.getState().setActiveTool('export');
        useUIStore.getState().setToolPanelOpen(true);
      },
    },
    // Edit
    {
      id: 'undo',
      category: 'Edit',
      label: 'Undo',
      icon: Undo2,
      shortcut: `${mod}Z`,
      action: () => {
        const restored = useHistoryStore.getState().undo();
        if (restored) useDocumentStore.getState().reorderPages(restored);
      },
    },
    {
      id: 'redo',
      category: 'Edit',
      label: 'Redo',
      icon: Redo2,
      shortcut: `${mod}Y`,
      action: () => {
        const restored = useHistoryStore.getState().redo();
        if (restored) useDocumentStore.getState().reorderPages(restored);
      },
    },
    {
      id: 'select-all',
      category: 'Edit',
      label: 'Select all',
      icon: CheckSquare,
      shortcut: `${mod}A`,
      action: () => useDocumentStore.getState().selectAll(),
    },
    {
      id: 'rotate-right',
      category: 'Edit',
      label: 'Rotate right',
      icon: RotateCw,
      shortcut: 'R',
      action: () => {
        const doc = useDocumentStore.getState();
        const selected = Array.from(doc.selectedPageIds);
        if (selected.length > 0) {
          useHistoryStore.getState().pushState(doc.pages);
          doc.rotatePages(selected, 90);
        }
      },
    },
    {
      id: 'rotate-left',
      category: 'Edit',
      label: 'Rotate left',
      icon: RotateCcw,
      action: () => {
        const doc = useDocumentStore.getState();
        const selected = Array.from(doc.selectedPageIds);
        if (selected.length > 0) {
          useHistoryStore.getState().pushState(doc.pages);
          doc.rotatePages(selected, -90);
        }
      },
    },
    {
      id: 'duplicate',
      category: 'Edit',
      label: 'Duplicate',
      icon: Copy,
      shortcut: 'D',
      action: () => {
        const doc = useDocumentStore.getState();
        const selected = Array.from(doc.selectedPageIds);
        if (selected.length > 0) {
          useHistoryStore.getState().pushState(doc.pages);
          doc.duplicatePages(selected);
        }
      },
    },
    {
      id: 'delete',
      category: 'Edit',
      label: 'Delete',
      icon: Trash2,
      shortcut: 'Del',
      action: () => {
        const doc = useDocumentStore.getState();
        const selected = Array.from(doc.selectedPageIds);
        if (selected.length > 0) {
          useHistoryStore.getState().pushState(doc.pages);
          doc.removePagesById(selected);
        }
      },
    },
    // View
    {
      id: 'zoom-in',
      category: 'View',
      label: 'Zoom in',
      icon: ZoomIn,
      shortcut: '+',
      action: () => useUIStore.getState().zoomIn(),
    },
    {
      id: 'zoom-out',
      category: 'View',
      label: 'Zoom out',
      icon: ZoomOut,
      shortcut: '−',
      action: () => useUIStore.getState().zoomOut(),
    },
    {
      id: 'reset-zoom',
      category: 'View',
      label: 'Reset zoom',
      icon: RotateCcwSquare,
      shortcut: `${mod}0`,
      action: () => useUIStore.getState().resetZoom(),
    },
    {
      id: 'toggle-sidebar',
      category: 'View',
      label: 'Toggle sidebar',
      icon: PanelLeft,
      action: () => useUIStore.getState().toggleSidebar(),
    },
    {
      id: 'toggle-tool-panel',
      category: 'View',
      label: 'Toggle tool panel',
      icon: PanelRight,
      action: () => useUIStore.getState().toggleToolPanel(),
    },
    // Tools
    {
      id: 'tool-watermark',
      category: 'Tools',
      label: 'Watermark',
      icon: Droplets,
      action: () => {
        useDocumentStore.getState().setActiveTool('watermark');
        useUIStore.getState().setToolPanelOpen(true);
      },
    },
    {
      id: 'tool-page-numbers',
      category: 'Tools',
      label: 'Page numbers',
      icon: Hash,
      action: () => {
        useDocumentStore.getState().setActiveTool('page-numbers');
        useUIStore.getState().setToolPanelOpen(true);
      },
    },
    {
      id: 'tool-compress',
      category: 'Tools',
      label: 'Compress',
      icon: Minimize2,
      action: () => {
        useDocumentStore.getState().setActiveTool('compress');
        useUIStore.getState().setToolPanelOpen(true);
      },
    },
    {
      id: 'tool-password',
      category: 'Tools',
      label: 'Password protect',
      icon: Lock,
      action: () => {
        useDocumentStore.getState().setActiveTool('password');
        useUIStore.getState().setToolPanelOpen(true);
      },
    },
    {
      id: 'tool-document-info',
      category: 'Tools',
      label: 'Document info',
      icon: Info,
      action: () => {
        useDocumentStore.getState().setActiveTool('document-info');
        useUIStore.getState().setToolPanelOpen(true);
      },
    },
  ], [onUpload]);

  const filtered = useMemo(() => {
    if (!search.trim()) return commands;
    const q = search.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q) ||
        (cmd.shortcut && cmd.shortcut.toLowerCase().includes(q))
    );
  }, [commands, search]);

  // Group filtered commands by category
  const grouped = useMemo(() => {
    const groups: { category: string; commands: Command[] }[] = [];
    const seen = new Set<string>();
    for (const cmd of filtered) {
      if (!seen.has(cmd.category)) {
        seen.add(cmd.category);
        groups.push({ category: cmd.category, commands: [] });
      }
      const group = groups.find((g) => g.category === cmd.category);
      if (group) group.commands.push(cmd);
    }
    return groups;
  }, [filtered]);

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Reset search when dialog opens
  useEffect(() => {
    if (commandPaletteOpen) {
      setSearch('');
      setSelectedIndex(0);
    }
  }, [commandPaletteOpen]);

  const executeCommand = useCallback(
    (cmd: Command) => {
      setCommandPaletteOpen(false);
      requestAnimationFrame(() => cmd.action());
    },
    [setCommandPaletteOpen]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % filtered.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + filtered.length) % filtered.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          executeCommand(filtered[selectedIndex]);
        }
      }
    },
    [filtered, selectedIndex, executeCommand]
  );

  // Scroll selected item into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const selected = list.querySelector('[data-selected="true"]');
    if (selected) {
      selected.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  return (
    <Dialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <DialogContent
        className="p-0 sm:max-w-lg [&>button:last-child]:hidden"
        onKeyDown={handleKeyDown}
      >
        <DialogTitle className="sr-only">Command Palette</DialogTitle>

        {/* Search bar */}
        <div className="flex h-12 items-center gap-2 border-b border-border/40 px-3">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground/50" />
          <input
            ref={inputRef}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Type a command..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/40"
            autoFocus
          />
          <kbd className="inline-flex items-center rounded border border-border/50 bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground/60">
            ESC
          </kbd>
        </div>

        {/* Command list */}
        <div ref={listRef} className="max-h-[320px] overflow-y-auto py-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
              <Search className="h-8 w-8 text-muted-foreground/20" />
              <p className="text-sm text-muted-foreground/40">No commands found</p>
            </div>
          ) : (
            grouped.map((group) => (
              <div key={group.category}>
                <div className="px-3 pb-1 pt-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/40">
                  {group.category}
                </div>
                {group.commands.map((cmd) => {
                  const flatIndex = filtered.indexOf(cmd);
                  const isSelected = flatIndex === selectedIndex;
                  return (
                    <button
                      key={cmd.id}
                      data-selected={isSelected}
                      className={cn(
                        'flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors',
                        isSelected
                          ? 'bg-blue-600/10 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400'
                          : 'text-foreground/80 hover:bg-muted/50'
                      )}
                      onClick={() => executeCommand(cmd)}
                      onMouseEnter={() => setSelectedIndex(flatIndex)}
                    >
                      <cmd.icon className="h-4 w-4 shrink-0 opacity-60" />
                      <span className="flex-1">{cmd.label}</span>
                      {cmd.shortcut && (
                        <kbd className="ml-auto inline-flex items-center rounded border border-border/50 bg-muted/50 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground/60">
                          {cmd.shortcut}
                        </kbd>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
