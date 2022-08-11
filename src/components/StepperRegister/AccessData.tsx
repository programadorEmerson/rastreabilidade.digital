import { FC, useState } from 'react';
import NumberFormat from 'react-number-format';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';

import { FormikContextType } from 'formik';

import { ContentAccessData } from '@styles/pages/signup';

import { RegisterType } from '@@types/register';

export type AccessDataProps = {
  formik: FormikContextType<RegisterType>;
};

export const AccessData: FC<AccessDataProps> = ({ formik }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <ContentAccessData>
      <Grid container spacing={2} padding={4}>
        <Grid item xs={6}>
          <TextField
            id="name"
            name="name"
            label="Nome"
            fullWidth
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={3}>
          <NumberFormat
            customInput={TextField}
            format={
              formik.values.typePhone === 'fixed'
                ? '(##) ####-####'
                : '(##) #.####-####'
            }
            mask=""
            allowNegative={false}
            fullWidth
            variant="outlined"
            name="phone"
            id="phone"
            type="text"
            label="Telefone"
            sx={{
              width: '100%',
            }}
            color="primary"
            focused
            value={formik.values.phone}
            onValueChange={(values) => {
              formik.setFieldValue('phone', values.formattedValue);
            }}
            onChange={() => {
              if (formik.values.phone.length >= 14) {
                formik.setFieldValue('typePhone', 'mobile');
              } else {
                formik.setFieldValue('typePhone', 'fixed');
              }
            }}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Grid>
        <Grid item xs={3}>
          <NumberFormat
            customInput={TextField}
            format={
              formik.values.type === 'pf'
                ? '###.###.###-##'
                : '##.###.###/####-##'
            }
            mask=""
            allowNegative={false}
            fullWidth
            variant="outlined"
            name="document"
            id="document"
            type="text"
            label="Cpf/Cnpj"
            sx={{
              width: '100%',
            }}
            color="primary"
            focused
            value={formik.values.document}
            onValueChange={(values) => {
              formik.setFieldValue('document', values.formattedValue);
            }}
            onChange={() => {
              if (formik.values.document.length >= 14) {
                formik.setFieldValue('type', 'pj');
              } else {
                formik.setFieldValue('type', 'pf');
              }
            }}
            error={formik.touched.document && Boolean(formik.errors.document)}
            helperText={formik.touched.document && formik.errors.document}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="email"
            name="email"
            label="Email"
            fullWidth
            type="text"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="emailConfirm"
            name="emailConfirm"
            label="Confirme o email"
            fullWidth
            type="text"
            value={formik.values.emailConfirm}
            onChange={formik.handleChange}
            error={
              formik.touched.emailConfirm && Boolean(formik.errors.emailConfirm)
            }
            helperText={
              formik.touched.emailConfirm && formik.errors.emailConfirm
            }
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="password"
            name="password"
            label="Senha"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            type={showPassword ? 'text' : 'password'}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirme a senha"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPassword &&
              Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
        </Grid>
      </Grid>
    </ContentAccessData>
  );
};
