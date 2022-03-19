import { IconButton, Stack, Typography } from '@mui/material';
import React from 'react';

export interface PickNumberInputProps {
    value: number,
    isSelected: boolean,
    onClick: (value:number) => void;
    isClickable: boolean;
}

export const PickNumberInput: React.FC<PickNumberInputProps> = (props: PickNumberInputProps) => {
  const backgroundColor = props.isSelected ? 'primary.main' : 'primary.contrastText';
  const textColor = props.isSelected ? 'primary.contrastText' : 'primary.main';

  const handleOnClick = () => {
    if (props.isClickable) {
      props.onClick(props.value);
    }
  };

  return (
        <IconButton
            sx={{
              backgroundColor: backgroundColor,
              borderColor: textColor,
              borderWidth: 2,
              borderStyle: 'solid',
              borderRadius: 999,
              width: 40,
              height: 40,
              '&:hover': {
                backgroundColor: backgroundColor, borderColor: textColor
              }
            }}
            onClick={handleOnClick}>
            <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
                <Typography color={textColor}>{props.value}</Typography>
            </Stack>
        </IconButton>
  );
};
