import { useTranslation } from 'react-i18next';
import { Ticket } from '@engine/Ticket';
import type { FixedLengthArray } from '@engine/types';
import { useSimulator } from '@/hooks/useSimulator';
import { Header } from '@/components/Header';
import { SettingsDrawer } from '@/components/SettingsDrawer';
import { YourNumbersCard } from '@/components/YourNumbersCard';
import { LatestDrawCard } from '@/components/LatestDrawCard';
import { BalanceChart } from '@/components/BalanceChart';
import { KpiGrid } from '@/components/KpiGrid';
import { EarningsCard } from '@/components/EarningsCard';
import { TimeSimulatedCard } from '@/components/TimeSimulatedCard';
import { KeyInsightsCard } from '@/components/KeyInsightsCard';
import { SimSpeedCard } from '@/components/SimSpeedCard';
import { PrizeBreakdownTable } from '@/components/PrizeBreakdownTable';
import { ExtraStatsRow } from '@/components/ExtraStatsRow';

export function SimulatorPage() {
  const { t } = useTranslation();
  const sim = useSimulator();
  const { stats } = sim;
  const totalWins = sim.lottery.wins.reduce((a, b) => a + b, 0);

  const handleTicketChange = (
    numbers: FixedLengthArray<[number, number, number, number, number, number]>,
  ) => {
    sim.setTicketAndReset(new Ticket(numbers));
  };

  return (
    <div className="min-h-screen">
      <Header
        isRunning={sim.isRunning}
        days={stats.days}
        onPlay={sim.play}
        onPause={sim.pause}
        onReset={sim.reset}
      />
      <SettingsDrawer />

      <main className="mx-auto flex max-w-[1600px] flex-col gap-4 p-5">
        <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-[300px_1fr_280px]">
          <div className="flex flex-col gap-3">
            <YourNumbersCard
              ticket={sim.ticket}
              lottery={sim.lottery}
              onTicketChange={handleTicketChange}
              onRandom={sim.randomTicket}
              disabled={sim.isRunning}
            />
            <KeyInsightsCard stats={stats} tickets={sim.tickets} />
            <div className="flex flex-col gap-3 xl:hidden">
              <TimeSimulatedCard time={stats.time} />
              <SimSpeedCard speed={sim.speed} onSpeedChange={sim.setSpeed} />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <LatestDrawCard
              lottery={sim.lottery}
              ticket={sim.ticket}
              tickets={sim.tickets}
            />
            <BalanceChart
              chartHistory={sim.chartHistory}
              ticketPrice={sim.lottery.ticketPrice}
            />
            <KpiGrid
              balance={stats.balance}
              roi={stats.roi}
              tickets={sim.tickets}
              winRate={stats.winRate}
            />
          </div>

          <div className="hidden flex-col gap-3 xl:flex">
            <TimeSimulatedCard time={stats.time} />
            <SimSpeedCard speed={sim.speed} onSpeedChange={sim.setSpeed} />
          </div>
        </div>

        <EarningsCard
          totalSpent={stats.totalSpent}
          totalWon={sim.lottery.totalWinnings}
          balance={stats.balance}
          recoveryPct={stats.recoveryPct}
          recoveryPctValue={stats.recoveryPctValue}
          breakEvenRemaining={stats.breakEvenRemaining}
        />

        <ExtraStatsRow stats={stats} tickets={sim.tickets} />

        <PrizeBreakdownTable
          rows={stats.prizeRows}
          tickets={sim.tickets}
          totalWins={totalWins}
        />

        <p className="pb-2 text-center text-[11px] tracking-wide text-[var(--text-muted)]">
          {t('LOTTO 6/49 SIMULATOR - For entertainment only.')}
        </p>
      </main>
    </div>
  );
}
