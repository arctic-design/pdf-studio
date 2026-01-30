'use client';

import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Hash } from 'lucide-react';
import { DEFAULT_PAGE_NUMBER_CONFIG } from '../../lib/constants';
import { cn } from '../../lib/cn';
import type { PageNumberConfig, PageNumberPosition, PageNumberFormat } from '../../types';

interface PageNumberPanelProps {
  onApply: (config: PageNumberConfig) => void;
}

const positions: { value: PageNumberPosition; label: string }[] = [
  { value: 'top-left', label: 'TL' },
  { value: 'top-center', label: 'TC' },
  { value: 'top-right', label: 'TR' },
  { value: 'bottom-left', label: 'BL' },
  { value: 'bottom-center', label: 'BC' },
  { value: 'bottom-right', label: 'BR' },
];

const formats: { value: PageNumberFormat; label: string; example: string }[] = [
  { value: 'numeric', label: 'Numeric', example: '1, 2, 3' },
  { value: 'roman', label: 'Roman', example: 'i, ii, iii' },
  { value: 'alphabetic', label: 'Alpha', example: 'a, b, c' },
];

export function PageNumberPanel({ onApply }: PageNumberPanelProps) {
  const [config, setConfig] = useState<PageNumberConfig>({
    ...DEFAULT_PAGE_NUMBER_CONFIG,
    enabled: true,
  });

  return (
    <div className="space-y-4 p-3">
      <div className="space-y-1.5">
        <Label className="text-[11px] text-foreground/60">Format</Label>
        <div className="flex overflow-hidden rounded-[3px] border border-border/40">
          {formats.map((fmt) => (
            <button
              key={fmt.value}
              onClick={() => setConfig({ ...config, format: fmt.value })}
              className={cn(
                'flex flex-1 flex-col items-center gap-0.5 border-r border-border/40 py-2 last:border-r-0',
                config.format === fmt.value
                  ? 'bg-blue-600 text-white'
                  : 'text-foreground/60 hover:bg-foreground/[0.05] hover:text-foreground'
              )}
            >
              <span className="text-[10px] font-medium">{fmt.label}</span>
              <span className={cn(
                'text-[9px]',
                config.format === fmt.value ? 'text-white/60' : 'text-foreground/40'
              )}>
                {fmt.example}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-[11px] text-foreground/60">Position</Label>
        <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[3px] border border-border/40">
          {positions.map((pos) => (
            <button
              key={pos.value}
              onClick={() => setConfig({ ...config, position: pos.value })}
              className={cn(
                'py-1.5 text-[10px] font-medium transition-colors',
                config.position === pos.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-background text-foreground/60 hover:bg-foreground/[0.05] hover:text-foreground'
              )}
            >
              {pos.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="pn-start" className="text-[11px] text-foreground/60">Start Number</Label>
        <Input
          id="pn-start"
          type="number"
          min={1}
          value={config.startNumber}
          onChange={(e) => setConfig({ ...config, startNumber: parseInt(e.target.value) || 1 })}
          className="h-8 rounded-[3px] text-[12px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1.5">
          <Label htmlFor="pn-prefix" className="text-[11px] text-foreground/60">Prefix</Label>
          <Input
            id="pn-prefix"
            value={config.prefix}
            onChange={(e) => setConfig({ ...config, prefix: e.target.value })}
            placeholder="Page "
            className="h-8 rounded-[3px] text-[12px]"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pn-suffix" className="text-[11px] text-foreground/60">Suffix</Label>
          <Input
            id="pn-suffix"
            value={config.suffix}
            onChange={(e) => setConfig({ ...config, suffix: e.target.value })}
            placeholder="of 10"
            className="h-8 rounded-[3px] text-[12px]"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-[11px] text-foreground/60">Font Size</Label>
          <span className="text-[11px] tabular-nums text-foreground/50">{config.fontSize}px</span>
        </div>
        <Slider
          min={8}
          max={36}
          step={1}
          value={[config.fontSize]}
          onValueChange={([v]) => setConfig({ ...config, fontSize: v })}
        />
      </div>

      <button
        onClick={() => onApply(config)}
        className="flex h-8 w-full items-center justify-center gap-2 rounded-[3px] bg-blue-600 text-[12px] font-medium text-white hover:bg-blue-500"
      >
        <Hash className="h-3.5 w-3.5" />
        Apply Page Numbers
      </button>
    </div>
  );
}
