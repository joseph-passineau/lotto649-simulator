import { useEffect, useId, useRef, useState } from 'react';
import { Info } from 'lucide-react';

interface InfoPopoverProps {
  content: string;
}

export function InfoPopover({ content }: InfoPopoverProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const popoverId = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-flex">
      <button
        type="button"
        className="inline-flex size-4 shrink-0 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--surface2)] hover:text-[var(--amber)]"
        aria-expanded={open}
        aria-controls={popoverId}
        aria-label={content}
        onClick={() => setOpen((v) => !v)}
      >
        <Info size={12} strokeWidth={2.5} />
      </button>
      {open && (
        <div
          id={popoverId}
          role="tooltip"
          className="absolute top-full left-0 z-50 mt-1.5 w-[min(16rem,calc(100vw-2rem))] rounded-lg border border-[var(--border2)] bg-[var(--surface2)] px-3 py-2 text-[11px] leading-snug text-[var(--text-secondary)] shadow-lg"
        >
          {content}
        </div>
      )}
    </div>
  );
}
