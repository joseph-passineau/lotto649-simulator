import type { ChartHistoryPoint } from '@/hooks/useSimulator';

/** One draw every 7 simulated days → ~52 draws per year */
export const DRAWS_PER_YEAR = 52n;

/** Max points when x-axis is per-draw (keeps Chart.js fast) */
export const CHART_DRAW_POINT_CAP = 80;

/** Append to React chart state every N draws while running */
export const CHART_SYNC_EVERY_DRAWS = 16;

/** Switch x-axis to years after this many draws (~1 simulated year) */
export const CHART_YEARLY_AFTER_DRAWS = DRAWS_PER_YEAR;

export type ChartXMode = 'draw' | 'year';

export interface ChartDisplaySeries {
  points: ChartHistoryPoint[];
  xMode: ChartXMode;
  xAxisLabel: string;
  formatLabel: (draw: bigint) => string;
}

function downsample(history: ChartHistoryPoint[], cap: number): ChartHistoryPoint[] {
  if (history.length <= cap) return history;
  const out: ChartHistoryPoint[] = [history[0]];
  const step = (history.length - 1) / (cap - 1);
  for (let i = 1; i < cap - 1; i++) {
    out.push(history[Math.round(i * step)]);
  }
  out.push(history[history.length - 1]);
  return out;
}

function aggregateByYear(history: ChartHistoryPoint[]): ChartHistoryPoint[] {
  const byYear = new Map<string, ChartHistoryPoint>();
  for (const p of history) {
    const year = p.draw / DRAWS_PER_YEAR;
    byYear.set(year.toString(), { ...p, draw: year });
  }
  return [...byYear.entries()]
    .sort(([a], [b]) => (BigInt(a) < BigInt(b) ? -1 : 1))
    .map(([, p]) => p);
}

export function buildChartDisplaySeries(history: ChartHistoryPoint[]): ChartDisplaySeries {
  if (history.length <= 1) {
    return {
      points: history,
      xMode: 'draw',
      xAxisLabel: 'Draw',
      formatLabel: (d) => d.toString(),
    };
  }

  const lastDraw = history[history.length - 1].draw;

  if (lastDraw >= CHART_YEARLY_AFTER_DRAWS) {
    const yearly = aggregateByYear(history);
    return {
      points: yearly.length > CHART_DRAW_POINT_CAP ? downsample(yearly, CHART_DRAW_POINT_CAP) : yearly,
      xMode: 'year',
      xAxisLabel: 'Year',
      formatLabel: (y) => `Y${(y + 1n).toString()}`,
    };
  }

  return {
    points: downsample(history, CHART_DRAW_POINT_CAP),
    xMode: 'draw',
    xAxisLabel: 'Draw',
    formatLabel: (d) => d.toString(),
  };
}
