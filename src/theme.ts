import { createTheme, PaletteMode, Theme } from '@mui/material';
import { grey, blue } from '@mui/material/colors';

const getPaletteTheme = (mode: PaletteMode) => {
  return createTheme(
    {
      palette: {
        mode,
        ...(mode === 'light'
          ? {
              background: {
                default: grey[50]
              },
              blue: {
                ...blue
              }
            }
          : {
              background: {
                default: grey[900],
                paper: grey[700]
              }
            })
      }
    }
  );
};

export const createAppTheme = (mode: PaletteMode): Theme => {
  const paletteTheme = getPaletteTheme(mode);

  return createTheme(
    {
      ...paletteTheme,
      components: {
        MuiCardHeader: {
          styleOverrides: {
            root: {
              backgroundColor: blue[50]
            }
          }
        },
        MuiTableHead: {
          styleOverrides: {
            root: {
              backgroundColor: blue[50]
            }
          }
        }
      }
    });
};
