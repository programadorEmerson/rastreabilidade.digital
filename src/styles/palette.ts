import { createTheme } from '@mui/material/styles';

const palette = createTheme({
  palette: {
    primary: {
      light: '#28282A',
      main: '#2d3436',
      dark: '#763993',
    },
    info: {
      light: '#28282A',
      main: '#763993',
      dark: '#4b4b4b',
    },
    common: {
      black: '#000000',
      white: '#FCFCFC',
    },
    background: {
      default: '#FCFCFC',
    },
  },
});

export default palette;
