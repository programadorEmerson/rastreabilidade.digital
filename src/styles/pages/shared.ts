import { Box, Paper, styled } from '@mui/material';

import { IsMobileType } from '@@types/layout';

import { ConstantsEnum } from '@enums/enum.constants';

export const CustomContainner = styled(Box)<IsMobileType>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${({ device }) => {
    const mobile = device === ConstantsEnum.MOBILE;
    return `calc(100vh - ${mobile ? 60 : 67}px)`;
  }};
  width: 100%;
  padding: ${({ device }) => {
    const mobile = device === ConstantsEnum.MOBILE;
    return mobile ? '0' : '3rem';
  }};
`;

export const CustomMain = styled(Paper)<IsMobileType>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ device }) => {
    const mobile = device === ConstantsEnum.MOBILE;
    return `calc(100vh - ${mobile ? 0 : 64}px)`;
  }};
  width: 100%;
  border-radius: 15px;
  background-color: ${({ theme, device }) => {
    const mobile = device === ConstantsEnum.MOBILE;
    return mobile ? theme.palette.grey[50] : theme.palette.primary.main;
  }};
`;

export const CustomPaper = styled(Paper)`
  background-color: ${({ theme }) => theme.palette.grey[50]};
`;
