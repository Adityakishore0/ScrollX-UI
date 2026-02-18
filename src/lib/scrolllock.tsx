'use client';

import { useState, useEffect } from 'react';
import { Lock, Unlock } from 'lucide-react';

export function ScrollLockToggle() {
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    document.body.style.overflow = locked ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [locked]);

  return (
    <button
      onClick={() => setLocked(!locked)}
      className='p-2 rounded-full hover:bg-muted transition'
    >
      {locked ? <Lock size={18} /> : <Unlock size={18} />}
    </button>
  );
}
