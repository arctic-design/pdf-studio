'use client';

import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Droplets } from 'lucide-react';
import { DEFAULT_WATERMARK_CONFIG } from '../../lib/constants';
import { cn } from '../../lib/cn';
import type { WatermarkConfig, WatermarkPosition } from '../../types';

interface WatermarkPanelProps {
  onApply: (config: WatermarkConfig) => void;
}

const positions: { value: WatermarkPosition; label: string }[] = [
  { value: 'top-left', label: 'TL' },
  { value: 'top-center', label: 'TC' },
  { value: 'top-right', label: 'TR' },
  { value: 'center', label: 'Center' },
  { value: 'bottom-left', label: 'BL' },
  { value: 'bottom-center', label: 'BC' },
  { value: 'bottom-right', label: 'BR' },
];

export function WatermarkPanel({ onApply }: WatermarkPanelProps) {
  const [config, setConfig] = useState<WatermarkConfig>(DEFAULT_WATERMARK_CONFIG);

  return (
    <div className="space-y-4 p-3">
      <div className="space-y-1.5">
        <Label htmlFor="wm-text" className="text-[11px] text-foreground/60">Text</Label>
        <Input
          id="wm-text"
          value={config.text}
          onChange={(e) => setConfig({ ...config, text: e.target.value })}
          placeholder="Enter watermark text..."
          className="h-8 rounded-[3px] text-[12px]"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-[11px] text-foreground/60">Font Size</Label>
          <span className="text-[11px] tabular-nums text-foreground/50">{config.fontSize}px</span>
        </div>
        <Slider
          min={12}
          max={120}
          step={1}
          value={[config.fontSize]}
          onValueChange={([v]) => setConfig({ ...config, fontSize: v })}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-[11px] text-foreground/60">Opacity</Label>
          <span className="text-[11px] tabular-nums text-foreground/50">{Math.round(config.opacity * 100)}%</span>
        </div>
        <Slider
          min={5}
          max={100}
          step={1}
          value={[Math.round(config.opacity * 100)]}
          onValueChange={([v]) => setConfig({ ...config, opacity: v / 100 })}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-[11px] text-foreground/60">Rotation</Label>
          <span className="text-[11px] tabular-nums text-foreground/50">{config.rotation}&deg;</span>
        </div>
        <Slider
          min={-180}
          max={180}
          step={1}
          value={[config.rotation]}
          onValueChange={([v]) => setConfig({ ...config, rotation: v })}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="wm-color" className="text-[11px] text-foreground/60">Color</Label>
        <div className="flex items-center gap-2">
          <div
            className="h-7 w-7 shrink-0 rounded-[3px] border border-border/40"
            style={{ backgroundColor: config.color }}
          />
          <input
            id="wm-color"
            type="color"
            value={config.color}
            onChange={(e) => setConfig({ ...config, color: e.target.value })}
            className="h-7 flex-1 cursor-pointer rounded-[3px] border-0"
          />
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

      <button
        onClick={() => onApply(config)}
        className="flex h-8 w-full items-center justify-center gap-2 rounded-[3px] bg-blue-600 text-[12px] font-medium text-white hover:bg-blue-500"
      >
        <Droplets className="h-3.5 w-3.5" />
        Apply Watermark
      </button>
    </div>
  );
}
