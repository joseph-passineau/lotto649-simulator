import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Lottery } from 'Lottery';
import { ToCurrency } from 'helper';

export interface TicketPriceProps {
    lottery: Lottery;
}

export const TicketPrice: React.FC<TicketPriceProps> = (props: TicketPriceProps) => {

    return (
    <Stack direction="row" gap={2} my={2}>
        <Typography variant="h5">Ticket price:</Typography>
        <Typography variant="h5" sx={{fontWeight: 'bold', color: 'primary.main'}}>{ToCurrency(props.lottery.ticketPrice)}</Typography>
    </Stack>
    )
}