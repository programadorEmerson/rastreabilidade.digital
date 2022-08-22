import { FC, Fragment, useState } from 'react';

import dynamic from 'next/dynamic';

import { Popover, Typography } from '@mui/material';

import { AccessDataProps } from '@components/StepperRegister/AccessData';

import { BoxCustomMessage, CustomIconHelp } from './styles';

const PasswordChecklist = dynamic(import('react-password-checklist'), {
  ssr: false,
});

export const CheckListPassword: FC<AccessDataProps> = ({ formik }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <Fragment>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <BoxCustomMessage>
          Senha inválida <CustomIconHelp />
        </BoxCustomMessage>
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <PasswordChecklist
          style={{ padding: '15px', color: '#282626' }}
          rules={['minLength', 'specialChar', 'number', 'capital', 'match']}
          minLength={8}
          value={formik.values.password}
          valueAgain={formik.values.confirmPassword}
          messages={{
            minLength: 'Conter no mínimo 8 dígitos',
            specialChar: 'Conter um caracter especial',
            number: 'Conter um número',
            capital: 'Conter uma letra maiúscula',
            match: 'As senhas devem ser iguais',
          }}
        />
      </Popover>
    </Fragment>
  );
};
