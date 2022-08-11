import { FC } from 'react';

import { Info } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';

import { FormikContextType } from 'formik';

import { PlansProps } from '@pages/signup';

import { RegisterType, TypesPlan } from '@@types/register';

import { numberFormatter, returnDueDate } from '@utils/numberFormatter';

import { returnRoleType } from '@enums/enum.feature.code';

import { CustomCard, CustomHeaderPlan } from './style';

type Props = {
  plan: PlansProps;
  formik: FormikContextType<RegisterType>;
};

const CardPayment: FC<Props> = ({ plan, formik }) => {
  const { plan: crrPlan } = formik.values;
  const { palette } = useTheme();

  function selectPlan(plan: PlansProps) {
    formik.setValues({
      ...formik.values,
      plan: plan.name,
      rules: returnRoleType(plan.name.toUpperCase() as TypesPlan),
      dueDate: returnDueDate(plan.name.toUpperCase() as TypesPlan),
    });
  }

  return (
    <CustomCard
      sx={{
        backgroundColor:
          crrPlan.toUpperCase() === plan.name.toUpperCase()
            ? 'rgba(41, 128, 185,0.09)'
            : 'transparent',
      }}
      elevation={crrPlan.toUpperCase() === plan.name.toUpperCase() ? 3 : 1}
    >
      <CustomHeaderPlan>
        <Typography
          padding={0}
          margin={0}
          variant="h4"
          gutterBottom
          component="div"
        >
          {plan.name}
        </Typography>
      </CustomHeaderPlan>
      <Typography variant="h5" gutterBottom component="div">
        {numberFormatter(plan.price / 100, 'currency')}
      </Typography>
      <Divider sx={{ width: '100%' }} />
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography variant="h6" display="block" gutterBottom>
          {plan.description}
        </Typography>
        <IconButton sx={{ margin: '0 0 0.5rem 0.3rem' }}>
          <Info sx={{ color: palette.primary.dark }} />
        </IconButton>
      </Box>
      <Button
        disabled={crrPlan.toUpperCase() === plan.name.toUpperCase()}
        variant="outlined"
        sx={{ width: '90%' }}
        onClick={() => selectPlan(plan)}
      >
        Selecionar
      </Button>
    </CustomCard>
  );
};

export default CardPayment;
