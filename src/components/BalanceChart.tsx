import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { ChartHistoryPoint } from '@/hooks/useSimulator';
import { fmt, moneyToChartScalar } from '@engine/fmt';
import { buildChartDisplaySeries } from '@/lib/chartSeries';
import { Card, SectionHeader } from './ui/Card';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Legend, Tooltip);

interface BalanceChartProps {
  chartHistory: ChartHistoryPoint[];
  ticketPrice: bigint;
}

export function BalanceChart({ chartHistory, ticketPrice }: BalanceChartProps) {
  const { t } = useTranslation();
  const display = useMemo(() => buildChartDisplaySeries(chartHistory), [chartHistory]);

  const chartData = useMemo(
    () => ({
      labels: display.points.map((p) => display.formatLabel(p.draw)),
      datasets: [
        {
          label: t('Balance'),
          data: display.points.map((p) => moneyToChartScalar(p.balance)),
          borderColor: '#f59e0b',
          borderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 6,
          tension: 0,
        },
        {
          label: t('Total spent'),
          data: display.points.map((p) => moneyToChartScalar(p.spent)),
          borderColor: '#f87171',
          borderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 6,
          tension: 0,
        },
      ],
    }),
    [display, t],
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: false as const,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      plugins: {
        legend: {
          position: 'top' as const,
          align: 'end' as const,
          labels: {
            color: '#94a3b8',
            font: { family: '"DM Sans", sans-serif', size: 11 },
            boxWidth: 12,
            padding: 12,
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: '#111827',
          borderColor: '#1e2d40',
          borderWidth: 1,
          titleColor: '#e2e8f0',
          bodyColor: '#94a3b8',
          callbacks: {
            label: (ctx: { datasetIndex: number; dataIndex: number }) => {
              const point = display.points[ctx.dataIndex];
              const value = ctx.datasetIndex === 0 ? point.balance : point.spent;
              const label = ctx.datasetIndex === 0 ? t('Balance') : t('Total spent');
              return `${label}: ${fmt(value)}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { color: 'rgba(30, 45, 64, 0.5)' },
          ticks: {
            color: '#3d5068',
            font: { family: '"JetBrains Mono", monospace', size: 10 },
            maxTicksLimit: 10,
          },
          title: {
            display: true,
            text: display.xMode === 'year' ? t('Year') : t('Draw'),
            color: '#64748b',
            font: { size: 10, family: '"DM Sans", sans-serif' },
          },
        },
        y: {
          grid: { color: 'rgba(30, 45, 64, 0.5)' },
          ticks: {
            color: '#3d5068',
            font: { family: '"JetBrains Mono", monospace', size: 10 },
            callback: (value: string | number) => fmt(BigInt(Math.round(Number(value)))),
          },
        },
      },
    }),
    [display, t],
  );

  const last = chartHistory[chartHistory.length - 1];
  const gap = last ? last.spent - last.balance : 0n;

  return (
    <Card>
      <SectionHeader
        title={t('Balance vs spent')}
        action={
          <span className="font-mono text-[10px] text-[var(--text-muted)]">
            {fmt(ticketPrice)}/{t('draw')}
          </span>
        }
      />
      <div className="h-[220px] w-full">
        {chartHistory.length > 1 ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-[var(--border2)] bg-[var(--surface2)]/50 text-sm text-[var(--text-muted)]">
            {t('Press Play to see graph')}
          </div>
        )}
      </div>
      {chartHistory.length > 1 && (
        <div className="mt-3 flex justify-between border-t border-[var(--border)] pt-3 text-[10px]">
          <span className="text-[var(--text-muted)]">{t('Gap between lines')}</span>
          <span className="font-mono font-semibold text-[var(--red)]">{fmt(gap)}</span>
        </div>
      )}
    </Card>
  );
}
