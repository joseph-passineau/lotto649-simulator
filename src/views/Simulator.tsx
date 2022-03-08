import React, { useEffect, useState } from 'react';
import { Button, Grid, Stack } from '@mui/material';
import { useInterval } from 'hooks/useInterval';
import { TimePassed } from 'components/TimePassed/TimePassed';
import { Ticket } from 'Ticket';
import { TicketCard } from 'components/TicketCard';
import { BankAccount } from 'BankAccount';
import { Lottery } from 'Lottery';
import { EarningStats } from 'components/EarningStats';
import { WinningDraw } from 'components/WinningDraw';
import { WinningsTable } from 'components/WinningsTable';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export interface SimulatorProps {
    ticket: Ticket;
    bankAccount: BankAccount;
    lottery: Lottery;
    reset: () => void;
}

export const Simulator: React.FC<SimulatorProps> = (props: SimulatorProps) => {
  const [tickets, setTickets] = useState(0);
  const { start, stop, isRunning } = useInterval({callBack: () => setTickets(x => x + 1), ms: 1 });

  useEffect(() => {
    if(tickets > 0) {
      props.bankAccount.Withdraw(props.lottery.ticketPrice);
      props.lottery.draw();

      var winnings = props.lottery.validateTicket(props.ticket);
      props.bankAccount.Deposit(winnings);
    }
  },[props.bankAccount, props.lottery, props.ticket, tickets])

  const resetSimulator = () => {
    stop();
    props.reset();
    setTickets(0);
  }

  return (
    <Grid container direction="row">
      <Grid item xs lg={3} sx={{backgroundColor: "grey.200"}} padding={2}>
        <Stack direction="row" marginY={2} justifyContent="space-between">
          <Stack direction="row" gap={2}>
            <Button variant="contained" onClick={start} disabled={isRunning} endIcon={<PlayArrowIcon />}>Play</Button>
            <Button variant="contained" onClick={stop} disabled={!isRunning} endIcon={<PauseIcon />}>Pause</Button>
          </Stack>
          <Button color="error" variant="contained" onClick={resetSimulator} endIcon={<RestartAltIcon />}>Reset</Button>
        </Stack>
        <TicketCard ticket={props.ticket} />      
      </Grid>
      <Grid container item xs lg={9} rowGap={2} padding={2}>
        <Grid container direction="row" gap={2}>
          <Grid direction="column" justifyContent="space-between" container item xs gap={2}>
              <WinningDraw draw={props.lottery.result} ticket={props.ticket} />
              <EarningStats balance={props.bankAccount.balance} totalEarning={props.lottery.totalWinnings} totalSpending={tickets * props.lottery.ticketPrice} />
          </Grid>
          <Grid item xs>
            <TimePassed days={tickets*7} />    
          </Grid>
        </Grid>
        <Grid item xs>
          <WinningsTable tickets={tickets} lottery={props.lottery} />
        </Grid>
      </Grid>
    </Grid>
  )
}
