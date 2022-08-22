import { Help } from '@mui/icons-material';
import { Box, styled } from '@mui/material';

export const BoxCustomMessage = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: start;
  color: ${({ theme }) => theme.palette.error.main};
  font-size: 0.8rem;
`;

export const CustomIconHelp = styled(Help)`
  width: 15px;
  margin: 0 0 0 5px;
  color: ${({ theme }) => theme.palette.primary.main};
`;
