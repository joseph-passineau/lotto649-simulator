import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { FixedLengthArray } from '@engine/types';
import { PickButton } from './ui/Buttons';

export interface PickTicketDialogProps {
  open: boolean;
  onClose: () => void;
  save: (numbers: FixedLengthArray<[number, number, number, number, number, number]>) => void;
  disabled?: boolean;
}

export function PickTicketDialog({ open, onClose, save, disabled }: PickTicketDialogProps) {
  const { t } = useTranslation();
  const [numbers, setNumbers] = useState<number[]>([]);

  if (!open) return null;

  const handleNumberClick = (value: number) => {
    if (disabled) return;
    if (numbers.includes(value)) {
      setNumbers(numbers.filter((n) => n !== value));
    } else if (numbers.length < 6) {
      setNumbers([...numbers, value]);
    }
  };

  const handleClose = () => {
    onClose();
    setNumbers([]);
  };

  const handleSave = () => {
    const sorted = [...numbers].sort((a, b) => a - b);
    save([sorted[0], sorted[1], sorted[2], sorted[3], sorted[4], sorted[5]]);
    handleClose();
  };

  const canSave = numbers.length === 6;
  const remaining = 6 - numbers.length;
  const allNumbers = Array.from({ length: 49 }, (_, i) => i + 1);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pick-dialog-title"
      onClick={handleClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[14px] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id="pick-dialog-title"
          className="font-mono text-lg font-extrabold tracking-wide text-[var(--text-primary)]"
        >
          {t('Pick your numbers')}
        </h2>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          {canSave
            ? t('You have picked 6 numbers.')
            : remaining === 1
              ? t('Pick 1 more number.')
              : t('Pick {{count}} more numbers.', { count: remaining })}
        </p>
        <div className="mt-4 grid grid-cols-7 gap-1.5">
          {allNumbers.map((n) => (
            <PickButton
              key={n}
              selected={numbers.includes(n)}
              disabled={disabled || (numbers.length >= 6 && !numbers.includes(n))}
              onClick={() => handleNumberClick(n)}
            >
              {n}
            </PickButton>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="cursor-pointer rounded-[9px] px-4 py-2 text-sm font-semibold text-[var(--red)] hover:bg-red-500/10 disabled:cursor-not-allowed"
          >
            {t('Cancel')}
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!canSave || disabled}
            className="cursor-pointer rounded-[9px] bg-[var(--amber)] px-4 py-2 text-sm font-bold text-[#1a0900] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {t('Confirm')}
          </button>
        </div>
      </div>
    </div>
  );
}
