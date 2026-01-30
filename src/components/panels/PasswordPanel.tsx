'use client';

import { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordPanelProps {
  onApply: (userPassword: string, ownerPassword: string) => void;
}

export function PasswordPanel({ onApply }: PasswordPanelProps) {
  const [userPassword, setUserPassword] = useState('');
  const [ownerPassword, setOwnerPassword] = useState('');
  const [showUser, setShowUser] = useState(false);
  const [showOwner, setShowOwner] = useState(false);

  return (
    <div className="space-y-4 p-3">
      <p className="text-[11px] leading-relaxed text-foreground/50">
        Set passwords to restrict who can open or modify the exported PDF.
      </p>

      <div className="space-y-1.5">
        <Label htmlFor="user-password" className="text-[11px] text-foreground/60">User Password</Label>
        <p className="text-[10px] text-foreground/40">Required to open the PDF</p>
        <div className="relative">
          <Input
            id="user-password"
            type={showUser ? 'text' : 'password'}
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            placeholder="Enter password..."
            className="h-8 rounded-[3px] pr-8 text-[12px]"
          />
          <button
            type="button"
            onClick={() => setShowUser(!showUser)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/60"
          >
            {showUser ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="owner-password" className="text-[11px] text-foreground/60">Owner Password</Label>
        <p className="text-[10px] text-foreground/40">Required to edit or print</p>
        <div className="relative">
          <Input
            id="owner-password"
            type={showOwner ? 'text' : 'password'}
            value={ownerPassword}
            onChange={(e) => setOwnerPassword(e.target.value)}
            placeholder="Enter password..."
            className="h-8 rounded-[3px] pr-8 text-[12px]"
          />
          <button
            type="button"
            onClick={() => setShowOwner(!showOwner)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/60"
          >
            {showOwner ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      <button
        onClick={() => onApply(userPassword, ownerPassword)}
        className="flex h-8 w-full items-center justify-center gap-2 rounded-[3px] bg-blue-600 text-[12px] font-medium text-white hover:bg-blue-500 disabled:opacity-30"
        disabled={!userPassword && !ownerPassword}
      >
        <Lock className="h-3.5 w-3.5" />
        Set Password
      </button>
    </div>
  );
}
