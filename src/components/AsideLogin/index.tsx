import { FC } from 'react';

import { Typography, useTheme } from '@mui/material';

import { useDeviceType } from '@hooks';

import { CustomAside, CustomStack } from '@styles/pages/sigin';

const AsideLogin: FC = () => {
  const { palette } = useTheme();
  const { type } = useDeviceType();
  return (
    <CustomAside device={type}>
      <CustomStack sx={{ padding: '0' }} device={type}>
        <Typography
          variant="h3"
          gutterBottom
          component="div"
          color={palette.grey[50]}
        >
          Bem vindo de volta
        </Typography>
        <Typography
          variant="h6"
          display="block"
          align="center"
          gutterBottom
          color={palette.grey[50]}
        >
          para se manter conectado conosco, faça login com suas informações
          pessoais.
        </Typography>
      </CustomStack>
    </CustomAside>
  );
};

export default AsideLogin;
