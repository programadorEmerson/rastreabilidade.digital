import styled from '@emotion/styled';

import { Box } from '@mui/material';

export const CustomContent = styled(Box)`
  display: flex;
  flex-direction: column;
  /* max-width: 1440px; */
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const CustomMain = styled('main')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1;
  padding: 0.1rem 0;
`;
