const THOUSAND = 1000n;

const SUFFIXES = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'] as const;

function tierIndex(abs: bigint): number {
  let tier = 0;
  let v = abs;
  while (v >= THOUSAND && tier < SUFFIXES.length - 1) {
    v /= THOUSAND;
    tier++;
  }
  return tier;
}

function formatMantissa(abs: bigint, wholeNumberUnder1k: boolean): string {
  const tier = tierIndex(abs);
  const divisor = THOUSAND ** BigInt(tier);
  const mantissaTimes100 = (abs * 100n) / divisor;
  const whole = mantissaTimes100 / 100n;
  const frac = (mantissaTimes100 % 100n).toString().padStart(2, '0');

  if (wholeNumberUnder1k && tier === 0 && frac === '00') {
    return whole.toString();
  }

  return `${whole}.${frac}${SUFFIXES[tier]}`;
}

export function fmt(n: bigint): string {
  const negative = n < 0n;
  const abs = negative ? -n : n;
  if (abs === 0n) return '$0.00';

  const sign = negative ? '−' : '';
  return `${sign}$${formatMantissa(abs, false)}`;
}

export function fmtCount(n: bigint): string {
  const negative = n < 0n;
  const abs = negative ? -n : n;
  if (abs === 0n) return '0';

  const sign = negative ? '−' : '';
  return `${sign}${formatMantissa(abs, true)}`;
}

export function fmtSigned(n: bigint): string {
  if (n < 0n) return `−${fmt(-n)}`;
  if (n > 0n) return `+${fmt(n)}`;
  return fmt(0n);
}

/** Format a ratio as a percentage with one decimal place (e.g. won / spent). */
export function fmtPercentBps(numerator: bigint, denominator: bigint, signed = false): string {
  if (denominator === 0n) return '0.0%';
  const tenths = (numerator * 1000n + denominator / 2n) / denominator;
  const abs = tenths < 0n ? -tenths : tenths;
  const str = `${abs / 10n}.${(abs % 10n).toString()}%`;
  if (!signed) return str;
  if (tenths > 0n) return `+${str}`;
  if (tenths < 0n) return `−${str}`;
  return str;
}

export function moneyToChartScalar(value: bigint): number {
  const abs = value < 0n ? -value : value;
  if (abs <= BigInt(Number.MAX_SAFE_INTEGER)) return Number(value);
  return Number(value / 1_000_000n);
}
