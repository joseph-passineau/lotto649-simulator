import { useCallback, useMemo, useReducer } from 'react';
import { BankAccount } from '@engine/BankAccount';
import { Lottery } from '@engine/Lottery';
import { Ticket } from '@engine/Ticket';
import type { DrawHistoryEntry } from '@/lib/simulatorStats';
import { buildSimulatorStats } from '@/lib/simulatorStats';
import { CHART_SYNC_EVERY_DRAWS } from '@/lib/chartSeries';
import { useInterval } from './useInterval';

export const BASE_INTERVAL_MS = 400;
export type SimSpeed = 1 | 10 | 100;

export interface ChartHistoryPoint {
  draw: bigint;
  balance: bigint;
  spent: bigint;
}

const INITIAL_CHART: ChartHistoryPoint[] = [{ draw: 0n, balance: 0n, spent: 0n }];

function syncChartSnapshot(ref: ChartHistoryPoint[]): ChartHistoryPoint[] {
  return [...ref];
}

function createInitialState(): SimulatorState {
  return {
    ticket: Ticket.generateRandomTicket(),
    bankAccount: new BankAccount(),
    lottery: new Lottery(),
    tickets: 0n,
    history: [],
    chartBuffer: [...INITIAL_CHART],
    chartHistory: INITIAL_CHART,
    speed: 1,
  };
}

interface SimulatorState {
  ticket: Ticket;
  bankAccount: BankAccount;
  lottery: Lottery;
  tickets: bigint;
  history: DrawHistoryEntry[];
  chartBuffer: ChartHistoryPoint[];
  chartHistory: ChartHistoryPoint[];
  speed: SimSpeed;
}

type SimulatorAction =
  | { type: 'advance_draw' }
  | { type: 'flush_chart' }
  | { type: 'reset' }
  | { type: 'set_ticket'; ticket: Ticket }
  | { type: 'set_speed'; speed: SimSpeed };

function simulatorReducer(state: SimulatorState, action: SimulatorAction): SimulatorState {
  switch (action.type) {
    case 'advance_draw': {
      const { bankAccount, lottery, ticket } = state;
      bankAccount.withdraw(lottery.ticketPrice);
      lottery.draw();
      const prize = lottery.validateTicket(ticket);
      bankAccount.deposit(prize);

      const next = state.tickets + 1n;
      const chartBuffer = [
        ...state.chartBuffer,
        {
          draw: next,
          balance: bankAccount.balance,
          spent: next * lottery.ticketPrice,
        },
      ];

      const shouldFlush =
        next === 1n || next % BigInt(CHART_SYNC_EVERY_DRAWS) === 0n;

      return {
        ...state,
        tickets: next,
        history: [...state.history, { won: prize > 0n, prize }],
        chartBuffer,
        chartHistory: shouldFlush ? syncChartSnapshot(chartBuffer) : state.chartHistory,
      };
    }
    case 'flush_chart':
      return {
        ...state,
        chartHistory: syncChartSnapshot(state.chartBuffer),
      };
    case 'reset':
      return createInitialState();
    case 'set_ticket':
      return {
        ...createInitialState(),
        ticket: action.ticket,
      };
    case 'set_speed':
      return { ...state, speed: action.speed };
    default:
      return state;
  }
}

export function useSimulator() {
  const [state, dispatch] = useReducer(simulatorReducer, undefined, createInitialState);

  const { ticket, bankAccount, lottery, tickets, history, chartHistory, speed } = state;

  const intervalMs = BASE_INTERVAL_MS / speed;
  const advanceDraw = useCallback(() => dispatch({ type: 'advance_draw' }), []);
  const { start, stop, isRunning } = useInterval(advanceDraw, intervalMs);

  const resetEngine = useCallback(() => {
    stop();
    dispatch({ type: 'reset' });
  }, [stop]);

  const pause = useCallback(() => {
    stop();
    if (tickets > 0n) {
      dispatch({ type: 'flush_chart' });
    }
  }, [stop, tickets]);

  const totalSpent = tickets * lottery.ticketPrice;

  const stats = useMemo(
    () =>
      buildSimulatorStats({
        tickets,
        balance: bankAccount.balance,
        totalWon: lottery.totalWinnings,
        totalSpent,
        lottery,
        history,
        speed,
      }),
    [tickets, bankAccount.balance, lottery, totalSpent, history, speed],
  );

  const setTicketAndReset = useCallback(
    (newTicket: Ticket) => {
      stop();
      dispatch({ type: 'set_ticket', ticket: newTicket });
    },
    [stop],
  );

  const play = useCallback(() => {
    if (ticket.numbers.length < 6) return;
    start();
  }, [start, ticket.numbers.length]);

  const randomTicket = useCallback(() => {
    setTicketAndReset(Ticket.generateRandomTicket());
  }, [setTicketAndReset]);

  const setSpeed = useCallback((next: SimSpeed) => {
    dispatch({ type: 'set_speed', speed: next });
  }, []);

  return {
    ticket,
    lottery,
    bankAccount,
    tickets,
    isRunning,
    speed,
    setSpeed,
    stats,
    chartHistory,
    totalSpent,
    play,
    pause,
    reset: resetEngine,
    setTicketAndReset,
    randomTicket,
  };
}
