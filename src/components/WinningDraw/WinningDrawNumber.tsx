import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

export interface WinningDrawNumberProps {
    number: Number;
    isWinner: boolean
}

export const WinningDrawNumber: React.FC<WinningDrawNumberProps> = (props: WinningDrawNumberProps) => {
  const backgroundColor = props.isWinner ? 'warning.light' : 'primary.main';

  return (
        <Box sx={{ backgroundColor: backgroundColor, borderRadius: 999, width: 40, height: 40 }}>
            <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
                <Typography color="common.white">{props.number}</Typography>
            </Stack>
        </Box>
  );
};
