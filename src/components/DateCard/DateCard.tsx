import React from 'react';
import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export interface DateCardProps {
    days: number;
}

export const DateCard: React.FC<DateCardProps> = (props: DateCardProps) => {
  const date = dayjs().add(props.days, 'day');

  return (
        <Typography align='right' variant="h3" my={2}>{date.format('MMMM YYYY')}</Typography>
  );
};
