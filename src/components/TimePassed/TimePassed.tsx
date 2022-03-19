import React from 'react';
import { Card, CardContent, CardHeader, Divider, List } from '@mui/material';
import { TimePassedListItem } from './TimePassedListItem';

export interface TimePassedProps {
    days: number;
}

export const TimePassed: React.FC<TimePassedProps> = (props: TimePassedProps) => {
  const daysInYear = 1461 / 4;

  const weeks = Math.floor(props.days / 7);
  const months = Math.floor(props.days / (365 / 12));
  const years = Math.floor(props.days / (daysInYear));
  const decades = Math.floor(props.days / (daysInYear * 10));
  const centuries = Math.floor(props.days / (daysInYear * 100));
  const millennias = Math.floor(props.days / (daysInYear * 1000));

  return (
    <Card>
        <CardHeader title="Time passed by" />
        <Divider />
        <CardContent sx={{ padding: 0, '&:last-child': { pb: 0 } }}>
            <List disablePadding>
                <TimePassedListItem number={props.days} label="Days" />
                <TimePassedListItem number={weeks} label="Weeks" />
                <TimePassedListItem number={months} label="Months" />
                <TimePassedListItem number={years} label="Years" />
                <TimePassedListItem number={decades} label="Decades" />
                <TimePassedListItem number={centuries} label="Centuries" />
                <TimePassedListItem number={millennias} label="Millennias" />
            </List>
        </CardContent>
    </Card>
  );
};
