import { FC } from 'react';

import { Button, Divider, Typography } from '@mui/material';

import { FormikContextType } from 'formik';

import { PlansProps } from '@pages/signup';

import { RegisterType } from '@@types/register';

import { numberFormatter, returnDueDate } from '@utils/numberFormatter';

import { returnRoleType } from '@enums/enum.feature.code';

import { CustomCard, CustomHeaderPlan } from './style';

type Props = {
  plan: PlansProps;
  formik: FormikContextType<RegisterType>;
};

const CardPayment: FC<Props> = ({ plan, formik }) => {
  const { plan: crrPlan } = formik.values;

  function selectPlan(plan: PlansProps) {
    formik.setValues({
      ...formik.values,
      plan: plan.name,
      rules: returnRoleType(
        plan.name.toUpperCase() as
          | 'FREE'
          | 'OURO'
          | 'PRATA'
          | 'BRONZE'
          | 'PLATINIUM',
      ),
      dueDate: returnDueDate(
        plan.name.toUpperCase() as
          | 'FREE'
          | 'OURO'
          | 'PRATA'
          | 'BRONZE'
          | 'PLATINIUM',
      ),
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
      <>
        <Divider sx={{ width: '100%' }} />
        <Typography variant="h5" display="block" gutterBottom>
          {plan.description}
        </Typography>
        <Divider sx={{ width: '100%' }} />
      </>
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
