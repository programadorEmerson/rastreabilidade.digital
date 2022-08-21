import { FC } from 'react';

import { useRouter } from 'next/router';

import { Search } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';

import { useFormik } from 'formik';

import * as yup from 'yup';

import { useElementContext } from '@hooks';

import { CustomFormRd } from './styles';

import { routesEnum } from '@enums/enum.routes';

import { AlertNotification } from '../AlertNotification';

type InitialValuesProps = {
  rdCode: string;
};

const initialValues: InitialValuesProps = {
  rdCode: '',
};

const SearchInputElement: FC = () => {
  const { findElementByCode } = useElementContext();
  const { asPath } = useRouter();

  const validationSchema = yup.object().shape({
    rdCode: yup.string().required('O código é obrigatório'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async ({ rdCode }) => {
      try {
        await findElementByCode(rdCode);
        AlertNotification({
          message: 'Item localizado',
          type: 'success',
        });
      } catch (error) {
        AlertNotification({
          message: 'Código não encontrado',
          type: 'warning',
        });
      }
    },
  });

  function showInput() {
    return (
      !asPath.includes(routesEnum.SIGN_UP) &&
      !asPath.includes(routesEnum.SIGN_IN)
    );
  }

  return (
    <CustomFormRd onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
      {showInput() && (
        <TextField
          label="Informe o código do item"
          id="rdCode"
          name="rdCode"
          size="small"
          sx={{
            m: 1,
            minWidth: '55ch',
            backgroundColor: 'rgba(236, 240, 241, 0.6)',
            color: 'red',
          }}
          value={formik.values.rdCode}
          onChange={formik.handleChange}
          error={formik.touched.rdCode && Boolean(formik.errors.rdCode)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">RD -</InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  type="submit"
                  edge="end"
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    </CustomFormRd>
  );
};

export default SearchInputElement;
