import { createTheme } from '@mui/material/styles';

const palette = createTheme({
  palette: {
    primary: {
      light: '#40779C',
      main: '#3D9CDB',
      dark: '#0F3D5E',
    },
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
    },
  },
});

export default palette;
