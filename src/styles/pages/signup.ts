import { Box, Paper, styled } from '@mui/material';

export const ContentSteep = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: calc(100vh - 64px);
  width: 100%;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.palette.grey[50]};
`;

export const CustomFormRegister = styled('form')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 64px);
  width: 100%;
  padding: 3rem;
`;

export const CustomFooterButtons = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
`;

export const ContentAccessData = styled(Box)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  flex: 1;
`;
