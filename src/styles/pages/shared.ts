import { Box, Paper, styled } from '@mui/material';

export const CustomContainner = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 67px);
  width: 100%;
  padding: 3rem;
`;

export const CustomMain = styled(Paper)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 64px);
  width: 100%;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.palette.primary.main};
`;

export const CustomPaper = styled(Paper)`
  background-color: ${({ theme }) => theme.palette.grey[50]};
`;
