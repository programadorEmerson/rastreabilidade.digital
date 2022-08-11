import React, { FC } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { useAuthContext } from '@hooks';

type SigOutDialogProps = {
  open: boolean;
  handleClose: () => void;
};

export const SigOutDialog: FC<SigOutDialogProps> = ({ handleClose, open }) => {
  const { handleSignOut } = useAuthContext();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ position: 'absolute', zIndex: 1000 }}
    >
      <DialogTitle id="alert-dialog-title">{'Efetuar logout?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Caso tenha informações não salvas elas serão perdidas, confirma?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          onClick={() => {
            handleSignOut();
            handleClose();
          }}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
