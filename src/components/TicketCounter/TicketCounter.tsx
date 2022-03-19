import React from 'react';
import { Card, CardContent, CardHeader, Divider, Stack, Typography } from '@mui/material';

export interface TicketCounterProps {
    ticketBought: number;
}

export const TicketCounter: React.FC<TicketCounterProps> = (props: TicketCounterProps) => {
  return (
    <Card>
        <CardHeader title="Ticket counter" />
        <Divider />
        <CardContent>
            <Stack alignItems="center">
                <Typography variant="h4">{props.ticketBought.toLocaleString()}</Typography>
            </Stack>
        </CardContent>
    </Card>
  );
};
