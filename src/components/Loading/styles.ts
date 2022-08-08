import { styled, Alert } from '@mui/material';

const AlertRoot = styled(Alert)(({ theme }) => ({
  backgroundColor: 'white',
  border: `1px solid ${theme.palette.grey[50]}`,
  boxShadow: '1px 1px 1px 1px rgb(0 0 0 / 10%)',
}));

const ContentContainer = styled('div')(() => ({
  display: 'flex',
  gap: 8,
  justifyContent: 'center',
  alignItems: 'center',
}));

export { AlertRoot, ContentContainer };
