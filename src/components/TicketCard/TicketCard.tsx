import React from 'react';
import { Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';
import { Ticket } from 'Ticket';
import { TicketCardNumber } from './TicketCardNumber';

export interface TicketCardProps {
    ticket: Ticket;
}

export const TicketCard: React.FC<TicketCardProps> = (props: TicketCardProps) => {

    return (
    <Card>
        <CardHeader title="Your numbers" />
        <Divider />
        <CardContent>
            <Stack direction="row" gap={2} justifyContent="space-around">
                {props.ticket.numbers.map((number) => (
                    <TicketCardNumber number={number} />
                ))}
            </Stack>
        </CardContent>
    </Card>
    )
}