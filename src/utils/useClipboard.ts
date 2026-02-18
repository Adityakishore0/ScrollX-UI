'use client';
import { useState } from 'react';

export function useClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const modernCopy = async (text: string): Promise<boolean> => {
    try {
      if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText)
        return false;
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  };

  const legacyCopy = (text: string): boolean => {
    try {
      if (typeof document === 'undefined') return false;
      const el = document.createElement('textarea');
      el.value = text;
      el.style.cssText =
        'position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;z-index:-1;';
      document.body.appendChild(el);
      el.focus();
      el.select();
      el.setSelectionRange(0, text.length);
      const ok = document.execCommand && document.execCommand('copy');
      document.body.removeChild(el);
      return !!ok;
    } catch {
      return false;
    }
  };

  const copy = async (text: string) => {
    if (!text.trim()) {
      setCopyFailed(true);
      setTimeout(() => setCopyFailed(false), timeout);
      return;
    }
    let success = false;
    try {
      success = await modernCopy(text);
      if (!success) success = legacyCopy(text);
    } catch (err) {
      console.error('Copy failed:', err);
    }
    setCopied(success);
    setCopyFailed(!success);
    setTimeout(() => {
      setCopied(false);
      setCopyFailed(false);
    }, timeout);
  };

  return { copied, copyFailed, copy };
}
