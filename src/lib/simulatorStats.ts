import intersection from 'lodash/intersection';
import type { Lottery } from '@engine/Lottery';
import type { LotteryDraw } from '@engine/LotteryDraw';
import type { Ticket } from '@engine/Ticket';
import { fmt, fmtPercentBps, fmtSigned } from '@engine/fmt';

export interface DrawHistoryEntry {
  won: boolean;
  prize: bigint;
}

const CATEGORY_COLORS = ['#64748b', '#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#f97316', '#ef4444'];

const DAYS_IN_YEAR_NUM = 1461 / 4;

export interface PrizeCategoryResult {
  category: string;
  categoryIndex: number;
  matchCount: number;
  resultLabel: string;
  isWin: boolean;
}

export function getPrizeCategory(
  ticket: Ticket,
  draw: LotteryDraw | null,
  lottery: Lottery,
): PrizeCategoryResult {
  if (!draw) {
    return {
      category: '-',
      categoryIndex: -1,
      matchCount: 0,
      resultLabel: '-',
      isWin: false,
    };
  }

  const hasBonus = ticket.numbers.includes(draw.bonus);
  const matched = intersection(ticket.numbers, draw.numbers);
  const matchCount = matched.length;

  let categoryIndex = -1;
  switch (matchCount) {
    case 2:
      categoryIndex = hasBonus ? 1 : 0;
      break;
    case 3:
      categoryIndex = 2;
      break;
    case 4:
      categoryIndex = 3;
      break;
    case 5:
      categoryIndex = hasBonus ? 5 : 4;
      break;
    case 6:
      categoryIndex = 6;
      break;
  }

  if (categoryIndex < 0) {
    return {
      category: 'No match',
      categoryIndex: -1,
      matchCount,
      resultLabel: `−${fmt(lottery.ticketPrice)}`,
      isWin: false,
    };
  }

  const prize = lottery.payouts[categoryIndex];
  const category = lottery.categories[categoryIndex];
  let resultLabel = fmtSigned(prize);
  if (categoryIndex === 6) {
    resultLabel = 'JACKPOT!';
  }

  return {
    category,
    categoryIndex,
    matchCount,
    resultLabel,
    isWin: true,
  };
}

export function computeTimeUnits(days: bigint) {
  const d = Number(days);
  const weeks = Math.floor(d / 7);
  const months = Math.floor(d / (365 / 12));
  const years = Math.floor(d / DAYS_IN_YEAR_NUM);
  const decades = Math.floor(d / (DAYS_IN_YEAR_NUM * 10));
  const centuries = Math.floor(d / (DAYS_IN_YEAR_NUM * 100));
  const millennia = Math.floor(d / (DAYS_IN_YEAR_NUM * 1000));
  return { days, weeks, months, years, decades, centuries, millennia };
}

export function computeStreaks(history: DrawHistoryEntry[]) {
  let worstLosing = 0;
  let bestWinning = 0;
  let currentLosing = 0;
  let currentWinning = 0;

  for (const entry of history) {
    if (entry.won) {
      currentWinning++;
      currentLosing = 0;
      bestWinning = Math.max(bestWinning, currentWinning);
    } else {
      currentLosing++;
      currentWinning = 0;
      worstLosing = Math.max(worstLosing, currentLosing);
    }
  }

  return { worstLosing, bestWinning };
}

/** Mean prize dollars returned per ticket if odds matched long-run averages. */
export function computeExpectedReturnPerTicket(lottery: Lottery): number {
  const expectedReturn = lottery.payouts.reduce(
    (sum, payout, i) => sum + Number(payout) / lottery.odds[i],
    0,
  );
  return Math.round(expectedReturn * 100) / 100;
}

/** Theoretical ROI from published odds (not cumulative sim state). */
export function computeExpectedRoiPercent(lottery: Lottery): number {
  const expectedReturn = computeExpectedReturnPerTicket(lottery);
  return Math.round(((expectedReturn - Number(lottery.ticketPrice)) / Number(lottery.ticketPrice)) * 1000) / 10;
}

function compound7Percent(principal: bigint, wholeYears: number): bigint {
  let v = principal;
  for (let i = 0; i < wholeYears; i++) {
    v = (v * 107n) / 100n;
  }
  return v;
}

export interface SimulatorStatsInput {
  tickets: bigint;
  balance: bigint;
  totalWon: bigint;
  totalSpent: bigint;
  lottery: Lottery;
  history: DrawHistoryEntry[];
  speed: number;
}

export interface PrizeTableRow {
  category: string;
  color: string;
  prize: bigint;
  wins: number;
  theorOdds: number;
  actualOdds: string;
  earned: bigint;
  performance: number | null;
  theorPct: number;
  barColor: string;
}

export function buildSimulatorStats(input: SimulatorStatsInput) {
  const { tickets, balance, totalWon, totalSpent, lottery, history, speed } = input;
  const days = tickets * 7n;
  const time = computeTimeUnits(days);
  const winningDraws = history.filter((h) => h.won).length;
  const winRate = fmtPercentBps(BigInt(winningDraws), tickets);
  const winRateValue =
    tickets > 0n
      ? Math.min(100, Number((BigInt(winningDraws) * 10000n) / tickets) / 100)
      : 0;
  const roi = fmtPercentBps(balance, totalSpent, true);
  const recoveryPct = fmtPercentBps(totalWon, totalSpent);
  const recoveryPctValue =
    totalSpent > 0n
      ? Math.min(100, Number((totalWon * 10000n) / totalSpent) / 100)
      : 0;
  const expectedRoi = computeExpectedRoiPercent(lottery);
  const roiBps = totalSpent > 0n ? (balance * 100_000n) / totalSpent : 0n;
  const roiNumeric = Number(roiBps) / 1000;
  const roiVsExpected = formatPercent(roiNumeric - expectedRoi, true);
  const { worstLosing, bestWinning } = computeStreaks(history);
  const maxPrize = history.reduce((max, h) => (h.prize > max ? h.prize : max), 0n);
  const avgPrizePerWin =
    winningDraws > 0 ? totalWon / BigInt(winningDraws) : 0n;
  const costPerWin =
    winningDraws > 0 ? totalSpent / BigInt(winningDraws) : 0n;
  const yearsSimulated =
    time.years > 0 ? time.years : Number(days) / DAYS_IN_YEAR_NUM;
  const avgSpendPerYear =
    time.years > 0
      ? totalSpent / BigInt(time.years)
      : totalSpent;
  const jackpotOdds = lottery.odds[6];
  const jackpotYears =
    tickets > 0n
      ? Math.round((jackpotOdds * yearsSimulated) / Number(tickets))
      : Infinity;
  const sp500Value = compound7Percent(totalSpent, Math.max(0, time.years));
  const bigWins = lottery.wins[4] + lottery.wins[5] + lottery.wins[6];

  let aggregateLuck = 0;
  let luckCategories = 0;
  const prizeRows: PrizeTableRow[] = lottery.categories.map((category, index) => {
    const wins = lottery.wins[index];
    const theorOdds = lottery.odds[index];
    const prize = lottery.payouts[index];
    const earned = BigInt(wins) * prize;
    const actualRatio = wins > 0 ? tickets / BigInt(wins) : 0n;
    const performance =
      wins > 0 ? Math.round((theorOdds / Number(actualRatio) - 1) * 1000) / 10 : null;
    const theorPct =
      wins > 0 ? Math.min(100, (theorOdds / Number(actualRatio)) * 100) : 0;
    const barColor =
      wins === 0 ? '#3d5068' : theorPct > 100 ? '#10b981' : '#f59e0b';

    if (performance !== null) {
      aggregateLuck += performance;
      luckCategories++;
    }

    return {
      category,
      color: CATEGORY_COLORS[index],
      prize,
      wins,
      theorOdds,
      actualOdds: wins === 0 ? '∞' : formatActualOdds(actualRatio),
      earned,
      performance,
      theorPct,
      barColor,
    };
  });

  const performanceVsOdds =
    luckCategories > 0 ? Math.round((aggregateLuck / luckCategories) * 10) / 10 : 0;
  const breakEvenRemaining =
    totalSpent > totalWon ? totalSpent - totalWon : 0n;

  return {
    days,
    time,
    totalSpent,
    balance,
    roi,
    roiNumeric,
    winRate,
    winRateValue,
    recoveryPct,
    recoveryPctValue,
    expectedRoi,
    roiVsExpected,
    worstLosing,
    bestWinning,
    maxPrize,
    avgPrizePerWin,
    costPerWin,
    avgSpendPerYear,
    jackpotOdds,
    jackpotYears,
    sp500Value,
    bigWins,
    winningDraws,
    prizeRows,
    performanceVsOdds,
    breakEvenRemaining,
    speed,
  };
}

export function formatActualOdds(ratio: bigint): string {
  if (ratio <= 0n) return '∞';
  if (ratio >= 1_000_000n) {
    const m = (ratio * 10n) / 1_000_000n;
    return `1 / ${Number(m) / 10}M`;
  }
  if (ratio >= 10_000n) return `1 / ${ratio.toString()}`;
  if (ratio >= 100n) return `1 / ${ratio.toString()}`;
  const tenths = (ratio * 10n + 5n) / 10n;
  return `1 / ${Number(tenths) / 10}`;
}

export function formatPercent(value: number, signed = false): string {
  const rounded = Math.round(value * 10) / 10;
  const str = `${Math.abs(rounded).toFixed(1)}%`;
  if (!signed) return str;
  if (rounded > 0) return `+${str}`;
  if (rounded < 0) return `−${str}`;
  return str;
}
