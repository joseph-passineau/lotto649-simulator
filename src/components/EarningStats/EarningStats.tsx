import React from 'react';
import { Card, CardContent, CardHeader, Divider, List, ListItemButton, Stack, Typography } from '@mui/material';
import { ToCurrency } from 'helper';

export interface EarningStatsProps {
    balance: number;
    totalEarning: number;
    totalSpending: number
}

export const EarningStats: React.FC<EarningStatsProps> = (props: EarningStatsProps) => {

    return (
    <Card>
        <CardHeader title="Earnings" />
        <Divider />
        <CardContent sx={{padding: 0, '&:last-child': { pb: 0 }}}>
            <List disablePadding>
                <ListItemButton divider sx={{cursor:"default"}}> 
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{width:'100%'}}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }} component="span">{ToCurrency(props.totalEarning)}</Typography>
                        <Typography variant="body1" component="span">Total earning</Typography>
                    </Stack>
                </ListItemButton>
                <ListItemButton divider sx={{cursor:"default"}}> 
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{width:'100%'}}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }} component="span">{ToCurrency(props.totalSpending)}</Typography>
                        <Typography variant="body1" component="span">Total spending</Typography>
                    </Stack>
                </ListItemButton>
                <ListItemButton divider sx={{cursor:"default"}}> 
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{width:'100%'}}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }} component="span" color={props.balance > 0 ? "green" : "red"}>{ToCurrency(props.balance)}</Typography>
                        <Typography variant="body1" component="span">Balance</Typography>
                    </Stack>
                </ListItemButton>
            </List>
        </CardContent>
    </Card>
    )
}