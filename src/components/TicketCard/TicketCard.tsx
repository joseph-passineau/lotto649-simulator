import React from 'react';
import { Card, CardContent, CardHeader, Divider, IconButton, Stack } from '@mui/material';
import { Ticket } from 'Ticket';
import { TicketCardNumber } from './TicketCardNumber';
import EditIcon from '@mui/icons-material/Edit';

export interface TicketCardProps {
    ticket: Ticket;
}

export const TicketCard: React.FC<TicketCardProps> = (props: TicketCardProps) => {

    return (
    <Card>
        <CardHeader 
        title="Your numbers" 
        action={
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          }
        />
        <Divider />
        <CardContent>
            <Stack direction="row" gap={2} justifyContent="space-around">
                {props.ticket.numbers.map((number) => (
                    <TicketCardNumber key={number} number={number} />
                ))}
            </Stack>
        </CardContent>
    </Card>
    )
}