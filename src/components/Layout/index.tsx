import React, { useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Button,
  Stack,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

import { useAuthContext } from '@hooks';

import AvatarUser from '@components/AvatarUser';
import { useMenu } from '@components/Layout/menu';
import SearchInputElement from '@components/SearchInputElement';
import { SiderbarListItem } from '@components/SiderbarListItem';

import { CustomMain } from './styles';

import { LayoutProps } from '@@types/layout';
import { GenerateMenuSection } from '@@types/menu.hook';

import { routesEnum } from '@enums/enum.routes';

const drawerWidth = 240;

const TooltipCustom = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.primary.main,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
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
  open: boolean;
}

export const ListTitle = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(1, 2, 0, 2),
  fontWeight: 900,
  color: theme.palette.primary.main,
}));

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
  const [open, setOpen] = useState(false);

  const { user } = useAuthContext();
  const { palette, direction } = useTheme();
  const { push, pathname } = useRouter();
  const { menuUsers } = useMenu();

  const generateMenuSection = ({ menuList, title }: GenerateMenuSection) => {
    return (
      <Box>
        <ListTitle noWrap variant="body2">
          {title}
        </ListTitle>
        <List>
          {menuList.map((menu) => (
            <SiderbarListItem
              TooltipCustom={TooltipCustom}
              key={`${menu.name}`}
              menu={menu}
              opened={open}
            />
          ))}
        </List>
        <Divider />
      </Box>
    );
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Head>
        <title>{`Rastreabilidade Digital - ${title}`}</title>
        <meta name="description" content="Rastreabilidade Digital" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppBar
        position="fixed"
        open={open && Boolean(user)}
        sx={{ backgroundColor: palette.grey[50] }}
      >
        <Toolbar
          sx={{
            backgroundColor: palette.grey[50],
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
          <SearchInputElement />
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
                      color: palette.primary.main,
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
                      color: palette.primary.main,
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
        open={open && Boolean(user)}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {generateMenuSection({
            menuList: menuUsers(),
            title: 'Geral',
          })}
        </List>
      </Drawer>
      <Main open={open && Boolean(user)}>
        <DrawerHeader />
        <CustomMain>{children}</CustomMain>
      </Main>
    </Box>
  );
};

export default Layout;
