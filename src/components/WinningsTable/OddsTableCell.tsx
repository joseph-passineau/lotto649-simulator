import React from 'react';
import { EpsilonRound } from 'helper';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import MinimizeIcon from '@mui/icons-material/Minimize';
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
                <MinimizeIcon />
            ): (
                <Stack direction="row" justifyContent="flex-end" gap={2}>
                    <Typography sx={{fontWeight:"bold"}} color={isTrendingDown ? "red" : "green"}>1 / {EpsilonRound(ratio).toFixed(1)}</Typography>
                    {isTrendingDown ? (
                        <ArrowDropDown color="error" />
                    ): (
                        <ArrowDropUpIcon color="success" />
                    )}
                </Stack>
            )}
        </TableCell>
    );
}