export { fmt, fmtCount, fmtSigned, fmtPercentBps, moneyToChartScalar } from './fmt';

/** @deprecated Use fmtPercentBps with bigint ratios for money-derived percentages */
export const epsilonRound = (value: number): number => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};
