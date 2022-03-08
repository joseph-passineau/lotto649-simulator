import React from 'react';
import { EpsilonRound } from 'helper';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import { Stack, TableCell, Typography } from '@mui/material';

export interface OddsTableCellProps {
    winningTickets: number;
    winningOdds: number;
    tickets: number;
}

export const OddsTableCell: React.FC<OddsTableCellProps> = (props: OddsTableCellProps) => {

    const ratio = props.tickets/props.winningTickets;
    const isTrendingDown = ratio > props.winningOdds;

    return (
        <TableCell align="right">
            {isNaN(ratio) || !isFinite(ratio) ? (
                <TrendingFlatIcon />
            ): (
                <Stack direction="row" justifyContent="flex-end" gap={2}>
                    <Typography sx={{fontWeight:"bold"}} color={isTrendingDown ? "red" : "green"}>1 / {EpsilonRound(ratio).toFixed(1)}</Typography>
                    {isTrendingDown ? (
                        <TrendingDownIcon color="error" />
                    ): (
                        <TrendingUpIcon color="success" />
                    )}
                </Stack>
            )}
        </TableCell>
    );
}