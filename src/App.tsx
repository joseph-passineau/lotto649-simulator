import { BankAccount } from 'BankAccount';
import { PageLayout } from 'components/Layout/PageLayout';
import { Lottery } from 'Lottery';
import React, { useState } from 'react';
import { Ticket } from 'Ticket';
import { Simulator } from 'views/Simulator';
import { createAppTheme } from "theme";
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

export const App: React.FC = () => {
  const [ticket, setTickets] = useState<Ticket>(Ticket.generateRandomTicket());
  const [bankAccount, setBankAccount] = useState<BankAccount>(new BankAccount());
  const [lottery, setLottery] = useState<Lottery>(new Lottery());

  const theme = createTheme(createAppTheme("light"));

  const resetSimulator = () => {
    setTickets(Ticket.generateRandomTicket());
    setBankAccount(new BankAccount());
    setLottery(new Lottery());
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PageLayout>
        <Simulator ticket={ticket} bankAccount={bankAccount} lottery={lottery} reset={resetSimulator}/>
      </PageLayout>
    </ThemeProvider>
  )
}
