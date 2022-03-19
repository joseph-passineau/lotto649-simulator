import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

export interface TicketCardNumberProps {
    number: Number;
}

export const TicketCardNumber: React.FC<TicketCardNumberProps> = (props: TicketCardNumberProps) => {
  return (
        <Box sx={{ backgroundColor: 'primary.main', borderRadius: 999, width: 40, height: 40 }}>
            <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
                <Typography color="common.white">{props.number}</Typography>
            </Stack>
        </Box>
  );
};
