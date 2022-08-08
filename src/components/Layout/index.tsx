import React, { useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { AddBoxRounded, EmojiPeople, LogoutSharp } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Stack } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

import { useAuthContext } from '@hooks';

import AvatarUser from '@components/MenuAvatar';

import { CustomMain } from './styles';

import { LayoutProps } from '@@types/layout';

import { routesEnum } from '@enums/enum.routes';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  // padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const theme = useTheme();
  const { user, handleSignOut } = useAuthContext();
  const { push, pathname } = useRouter();
  const [open, setOpen] = useState(false);

  const itemsMenu = [
    {
      label: 'Novo Registro',
      icon: <AddBoxRounded />,
      action: () => {
        push(routesEnum.NEW_REGISTRATION);
      },
    },
    {
      label: 'Logout',
      icon: <LogoutSharp />,
      action: () => {
        handleSignOut();
        handleDrawerClose();
      },
    },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Head>
        <title>{`Rastreabilidade Digital - ${title}`}</title>
        <meta name="description" content="Rastreabilidade Digital" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar
        position="fixed"
        open={open}
        sx={{ backgroundColor: theme.palette.grey[50] }}
      >
        <Toolbar
          sx={{
            backgroundColor: theme.palette.grey[50],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Box>
            {user && (
              <IconButton
                color="primary"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
            )}
            <Button size="large" onClick={() => push(routesEnum.INITIAL_ROUTE)}>
              RASTREABILIDADE DIGITAL
            </Button>
          </Box>
          <Box>
            {user ? (
              <AvatarUser />
            ) : (
              <Stack spacing={2} direction="row">
                {pathname !== `/${routesEnum.SIGN_UP}` && (
                  <Button
                    variant="text"
                    color="secondary"
                    name={routesEnum.SIGN_IN}
                    onClick={() => push(routesEnum.SIGN_UP)}
                    sx={{
                      color: theme.palette.primary.main,
                    }}
                  >
                    Cadastrar
                  </Button>
                )}
                {pathname !== `/${routesEnum.SIGN_IN}` && (
                  <Button
                    variant="text"
                    color="secondary"
                    name={routesEnum.SIGN_IN}
                    onClick={() => push(routesEnum.SIGN_IN)}
                    sx={{
                      color: theme.palette.primary.main,
                    }}
                  >
                    Login
                  </Button>
                )}
              </Stack>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {itemsMenu.map(({ label, action, icon }, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={action}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <CustomMain>{children}</CustomMain>
      </Main>
    </Box>
  );
};

export default Layout;
