'use client';

import { useState } from 'react';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Minimize2 } from 'lucide-react';
import { cn } from '../../lib/cn';

interface CompressPanelProps {
  onApply: (quality: number) => void;
}

const presets = [
  { label: 'Low', quality: 30 },
  { label: 'Medium', quality: 60 },
  { label: 'High', quality: 80 },
  { label: 'Best', quality: 95 },
];

export function CompressPanel({ onApply }: CompressPanelProps) {
  const [quality, setQuality] = useState(80);

  const qualityLevel =
    quality <= 30 ? 'Low' : quality <= 60 ? 'Medium' : quality <= 80 ? 'High' : 'Best';

  return (
    <div className="space-y-4 p-3">
      <p className="text-[11px] leading-relaxed text-foreground/50">
        Reduce file size by adjusting image compression quality. Lower quality means smaller files.
      </p>

      <div className="space-y-1.5">
        <Label className="text-[11px] text-foreground/60">Preset</Label>
        <div className="flex overflow-hidden rounded-[3px] border border-border/40">
          {presets.map((preset) => (
            <button
              key={preset.label}
              onClick={() => setQuality(preset.quality)}
              className={cn(
                'flex-1 border-r border-border/40 py-1.5 text-[10px] font-medium transition-colors last:border-r-0',
                quality === preset.quality
                  ? 'bg-blue-600 text-white'
                  : 'text-foreground/60 hover:bg-foreground/[0.05] hover:text-foreground'
              )}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label className="text-[11px] text-foreground/60">Image Quality</Label>
          <span className="text-[11px] tabular-nums text-foreground/50">
            {quality}% &middot; {qualityLevel}
          </span>
        </div>
        <Slider
          min={10}
          max={100}
          step={1}
          value={[quality]}
          onValueChange={([v]) => setQuality(v)}
        />
        <div className="flex justify-between text-[9px] text-foreground/40">
          <span>Smaller file</span>
          <span>Better quality</span>
        </div>
      </div>

      <button
        onClick={() => onApply(quality)}
        className="flex h-8 w-full items-center justify-center gap-2 rounded-[3px] bg-blue-600 text-[12px] font-medium text-white hover:bg-blue-500"
      >
        <Minimize2 className="h-3.5 w-3.5" />
        Compress PDF
      </button>
    </div>
  );
}
