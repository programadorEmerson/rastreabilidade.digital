import React from 'react';

import { useRouter } from 'next/router';

import { ListItem, ListItemText } from '@mui/material';

import { SigOutDialog } from '@components/DialogLogout';

import { CustomListItemIcon, SpanName } from './styles';

import { MenuList } from '@@types/menu.hook';

import { routesEnum } from '@enums/enum.routes';

type SiderbarListItemProps = {
  menu: MenuList;
  TooltipCustom: any;
  opened: boolean;
};

export const SiderbarListItem: React.FC<SiderbarListItemProps> = ({
  menu,
  opened,
  TooltipCustom,
}) => {
  const [open, setOpen] = React.useState(false);
  const { name, icon, path, disabled, active } = menu;
  const { push } = useRouter();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <SigOutDialog open={open} handleClose={handleClose} />
      <ListItem
        button
        disabled={disabled}
        selected={active}
        onClick={() => {
          if (path.includes(routesEnum.LOGOUT)) {
            return handleClickOpen();
          }
          return push(path);
        }}
      >
        <CustomListItemIcon>
          <TooltipCustom
            title={name}
            placement="left"
            disableHoverListener={opened}
          >
            {icon}
          </TooltipCustom>
        </CustomListItemIcon>
        <ListItemText disableTypography>
          <SpanName
            className={
              !disabled
                ? `active-menu-item ${active && 'selected-menu-item'}`
                : 'disabled-menu-item'
            }
          >
            {name}
          </SpanName>
        </ListItemText>
      </ListItem>
    </>
  );
};
