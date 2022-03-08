import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Lottery } from 'Lottery';
import { OddsTableCell } from './OddsTableCell';

export interface WinningsTableProps {
    lottery: Lottery;
    tickets: number;
}

export const WinningsTable: React.FC<WinningsTableProps> = (props: WinningsTableProps) => {

    return (
        <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{fontWeight:"bold"}}>Category</TableCell>
              <TableCell align="right" sx={{fontWeight:"bold"}}>Times won</TableCell>
              <TableCell align="right" sx={{fontWeight:"bold"}}>Prize</TableCell>
              <TableCell align="right" sx={{fontWeight:"bold"}}>Odds of winning</TableCell>
              <TableCell align="right" sx={{fontWeight:"bold"}}>Odds</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.lottery.categories.map((category, index) => (
              <TableRow hover key={category} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {category}
                </TableCell>
                <TableCell align="right" sx={{fontWeight:"bold"}}>{props.lottery.wins[index]}</TableCell>
                <TableCell align="right">{props.lottery.payouts[index].toLocaleString("en-CA",{style: 'currency', currency: 'CAD'})}</TableCell>
                <TableCell align="right">1 / {props.lottery.odds[index]}</TableCell>
                <OddsTableCell tickets={props.tickets} winningOdds={props.lottery.odds[index]} winningTickets={props.lottery.wins[index]} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}