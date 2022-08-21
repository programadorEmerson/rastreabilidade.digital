import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

type MuiAppBarProps = {
  open?: boolean;
} & Partial<AppBarProps>;
