import React from 'react';
import { SvgIcon, SvgIconProps } from '@mui/material';
import { ReactComponent as LogoIconSvg } from 'assets/images/logo.svg';

export const LogoIcon: React.FC<SvgIconProps> = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <LogoIconSvg />
    </SvgIcon>
  );
};
