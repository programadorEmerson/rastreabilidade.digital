import { Box, Paper, styled } from '@mui/material';

export const CustomCard = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0 0 1rem 0;
  width: 20%;
  height: 50vh;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
`;

export const CustomHeaderPlan = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  width: 100%;
  border-radius: 5px 5px 0 0;
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: white;
`;
