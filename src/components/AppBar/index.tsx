import * as React from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar as ContentAppBar,
  Avatar,
  Stack,
  useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import useAuthContext from '@hooks';

export default function AppBar() {
  const { user } = useAuthContext();
  const { palette } = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ContentAppBar position="static">
        <Toolbar sx={{ backgroundColor: palette.common.white }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon
              sx={{ color: palette.common.black, fontWeight: 'bold' }}
            />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: palette.common.black,
              fontWeight: 500,
            }}
          >
            RASTREABILIDADE DIGITAL
          </Typography>
          {user ? (
            <Avatar
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 46, height: 46 }}
            />
          ) : (
            <Stack spacing={2} direction="row">
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  fontWeight: 'bold',
                  color: palette.common.black,
                  border: '1 solid',
                  borderColor: palette.common.black,
                }}
              >
                Registrar
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  fontWeight: 'bold',
                  color: palette.common.black,
                  border: '1 solid',
                  borderColor: palette.common.black,
                }}
              >
                Login
              </Button>
            </Stack>
          )}
        </Toolbar>
      </ContentAppBar>
    </Box>
  );
}
