/* eslint-disable react-hooks/exhaustive-deps */
import { FC } from 'react';

import Image from 'next/image';

import { Search } from '@mui/icons-material';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';

import { useFormik } from 'formik';

import * as yup from 'yup';

import { useElementContext } from '@hooks';

import {
  ContentFooterHero,
  ContentMainHero,
  CustomFormRd,
  CustomHeroContent,
  InfoFooterHero,
} from './styles';

import { AlertNotification } from '../AlertNotification';

type InitialValuesProps = {
  rdCode: string;
};

const initialValues: InitialValuesProps = {
  rdCode: '',
};

const Hero: FC = () => {
  const { findElementByCode } = useElementContext();

  const validationSchema = yup.object().shape({
    rdCode: yup.string().required('O código é obrigatório'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async ({ rdCode }) => {
      try {
        await findElementByCode(`RD-${rdCode}`);
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

  return (
    <Typography
      component="div"
      width={1}
      height={0.41}
      variant="body1"
      style={{ position: 'relative' }}
    >
      <CustomHeroContent zIndex="tooltip">
        <ContentMainHero>
          <CustomFormRd
            onSubmit={formik.handleSubmit}
            onBlur={formik.handleBlur}
          >
            <TextField
              label="Informe o código do item"
              id="rdCode"
              name="rdCode"
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
          </CustomFormRd>
        </ContentMainHero>
        <ContentFooterHero>
          <InfoFooterHero>
            A RASTREABILIDADE DE TODO PROCESSO ESTÁ AQUI
          </InfoFooterHero>
        </ContentFooterHero>
      </CustomHeroContent>
      <Box sx={{ zIndex: 'modal' }}>
        <Image
          alt="Hero Header"
          src="/assets/hero.jpeg"
          layout="responsive"
          objectFit="cover"
          quality={100}
          width={1}
          height={0.41}
        />
      </Box>
    </Typography>
  );
};

export default Hero;
