import { FC } from 'react';

import { Typography, useTheme } from '@mui/material';

import { CustomAside, CustomStack } from '@styles/pages/sigin';

const AsideLogin: FC = () => {
  const theme = useTheme();
  return (
    <CustomAside>
      <CustomStack>
        <Typography
          variant="h3"
          gutterBottom
          component="div"
          color={theme.palette.grey[50]}
        >
          Bem vindo de volta
        </Typography>
        <Typography
          variant="h6"
          display="block"
          align="center"
          gutterBottom
          color={theme.palette.grey[50]}
        >
          para se manter conectado conosco, faça login com suas informações
          pessoais.
        </Typography>
      </CustomStack>
    </CustomAside>
  );
};

export default AsideLogin;
