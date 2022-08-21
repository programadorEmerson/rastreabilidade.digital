import React from 'react';

import { useRouter } from 'next/router';

import { Assessment, Logout } from '@mui/icons-material';

import { useCaslAbilities } from '@hooks';

import { MenuHook, MenuList } from '@@types/menu.hook';

import { FeatureCodeEnum } from '@enums/enum.feature.code';
import { MenuNamesEnum } from '@enums/enum.item.menu';
import { routesEnum } from '@enums/enum.routes';

export const useMenu = (): MenuHook => {
  const { asPath } = useRouter();
  const { featuresArray } = useCaslAbilities();

  const isActive = (menuPath: string): boolean => asPath.includes(menuPath);

  const filterMenuList = (menuList: MenuList[]) => {
    const allowedMenu: MenuList[] = [];
    menuList.map(
      (menu) => featuresArray.includes(menu.code) && allowedMenu.push(menu),
    );
    return allowedMenu;
  };

  const menuUsers = () => {
    const items = [
      {
        icon: <Assessment />,
        name: MenuNamesEnum.NEW_RECORD,
        path: routesEnum.NEW_REGISTRATION,
        active: isActive(routesEnum.NEW_REGISTRATION),
        disabled: false,
        code: FeatureCodeEnum.FC_ALL,
      },
      {
        icon: <Logout />,
        name: MenuNamesEnum.LOGOUT,
        path: routesEnum.LOGOUT,
        active: isActive(routesEnum.LOGOUT),
        disabled: false,
        code: FeatureCodeEnum.FC_ALL,
      },
    ];
    return filterMenuList(items);
  };

  return { menuUsers };
};
