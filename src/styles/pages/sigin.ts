import { Box, Button, Divider, Paper, Stack, styled } from '@mui/material';

export const CustomContainner = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 64px);
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

export const CustomAside = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 40%;
  padding: 3rem;
`;

export const CustomStack = styled(Stack)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const CustomForm = styled('form')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 60%;
  background-color: ${({ theme }) => theme.palette.grey[50]};
`;

export const CustomDivider = styled(Divider)`
  color: ${({ theme }) => theme.palette.grey[600]};
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: 25px 0 20px 0;
  width: 100%;
`;

export const LinkActions = styled('a')`
  background-color: transparent;
  color: ${({ theme }) => theme.palette.grey[600]};
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  border: 0;
  padding: 2px;
  transition: 0.4s;
  outline: none;

  &:not(:disabled):hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }

  & span {
    color: ${({ theme }) => theme.palette.grey[900]};
    margin-right: 7px;

    &:not(:disabled):hover {
      cursor: Default;
    }
  }
`;

export const CustomText = styled('span')`
  color: ${({ theme }) => theme.palette.grey[900]};
  font-weight: normal;
`;

export const CustonButtonLogin = styled(Button)`
  color: ${({ theme }) => theme.palette.common.white};
  background-color: ${({ theme }) => theme.palette.primary.main};
  margin: 20px 0;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.light};
  }
`;
