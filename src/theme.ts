import { createTheme, PaletteMode, Theme } from "@mui/material";
import { grey } from "@mui/material/colors";

const getPaletteTheme = (mode: PaletteMode) => {
  return createTheme(
    {
      palette: {
        mode,
        ...(mode === "light"
          ? {
            background: {
              default: grey[50]
            },
          }
          : {
            background: {
              default: grey[900],
              paper: grey[700],            
            },
          }),
      },
    }
  );
};

export const createAppTheme = (mode: PaletteMode): Theme => {
  const paletteTheme = getPaletteTheme(mode);

  return createTheme(
    {
      ...paletteTheme
    });
};
