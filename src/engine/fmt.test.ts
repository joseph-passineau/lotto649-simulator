import { describe, expect, test } from 'vitest';
import { fmt, fmtCount, fmtPercentBps } from './fmt';

describe('fmt', () => {
  test('formats small values', () => {
    expect(fmt(0n)).toBe('$0.00');
    expect(fmt(3n)).toBe('$3.00');
    expect(fmt(-3n)).toBe('−$3.00');
  });

  test('formats suffix tiers', () => {
    expect(fmt(1234567n)).toBe('$1.23M');
    expect(fmt(8811827n)).toBe('$8.81M');
  });
});

describe('fmtPercentBps', () => {
  test('formats won vs spent ratio (not 10x inflated)', () => {
    expect(fmtPercentBps(2680n, 12260n)).toBe('21.9%');
    expect(fmtPercentBps(0n, 100n)).toBe('0.0%');
    expect(fmtPercentBps(100n, 100n)).toBe('100.0%');
  });
});

describe('fmtCount', () => {
  test('formats counts without dollar sign', () => {
    expect(fmtCount(0n)).toBe('0');
    expect(fmtCount(274n)).toBe('274');
    expect(fmtCount(1234567n)).toBe('1.23M');
  });
});
