import { createTheme } from '@mui/material/styles';

const palette = createTheme({
  palette: {
    primary: {
      light: '#227A9A',
      main: '#226A9C',
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
    grey: {
      '50': '#FCFCFC',
      '100': '#f5f5f5',
      '200': '#eeeeee',
      '300': '#e0e0e0',
      '400': '#bdbdbd',
      '500': '#9e9e9e',
      '600': '#757575',
      '700': '#616161',
      '800': '#424242',
      '900': '#212121',
    },
  },
});

export default palette;
