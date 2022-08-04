import { createTheme } from '@mui/material/styles';

import palette from '@styles/palette';
import typography from '@styles/typography';

const theme = createTheme({ ...typography, ...palette });

export default theme;
