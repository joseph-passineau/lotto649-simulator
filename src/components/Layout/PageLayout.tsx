import React from 'react';
import { Box } from '@mui/system';
import { AppBar, Stack, Toolbar, Typography } from '@mui/material';
import { LogoIcon } from 'components/Icons/LogoIcon';

interface PageLayoutProps {
    children?: React.ReactNode;
    title?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }: PageLayoutProps) => {

  return (
    <Box sx={{minHeight:'100vh', display:'flex', flexDirection:'column'}}>
      <AppBar position="relative">
        <Toolbar>
          <Stack direction="row" gap={2} alignItems="center">
            <LogoIcon />
            <Typography variant="h6" color="inherit" noWrap>
              Lotto 6/49 Simulator
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
};
