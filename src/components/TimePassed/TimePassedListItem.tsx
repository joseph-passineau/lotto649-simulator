import React from 'react';
import { ListItemButton, Stack, Typography } from '@mui/material';

export interface TimePassedListItemProps {
    number: number;
    label: string;
}

export const TimePassedListItem: React.FC<TimePassedListItemProps> = (props: TimePassedListItemProps) => {
  return (
        <ListItemButton divider sx={{ cursor: 'default' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%' }}>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }} component="span">{props.number.toLocaleString()}</Typography>
                <Typography variant="body1" component="span">{props.label}</Typography>
            </Stack>
        </ListItemButton>
  );
};
