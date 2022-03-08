import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

export interface WinningDrawNumberProps {
    number: Number;
}

export const WinningDrawNumber: React.FC<WinningDrawNumberProps> = (props: WinningDrawNumberProps) => {

    return (
        <Box sx={{backgroundColor: 'primary.main', borderRadius: 999, width: 40, height: 40}}>
            <Stack alignItems="center" justifyContent="center" sx={{height:"100%"}}>
                <Typography color="common.white">{props.number}</Typography>
            </Stack>
        </Box>
    )
}