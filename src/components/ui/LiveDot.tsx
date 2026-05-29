export function LiveDot({ running }: { running: boolean }) {
  return (
    <div
      className={`size-[7px] animate-blink rounded-full ${running ? 'bg-[var(--emerald)]' : 'bg-[var(--red)]'}`}
    />
  );
}
