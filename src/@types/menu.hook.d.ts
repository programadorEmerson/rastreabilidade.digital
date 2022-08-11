import { FeatureCodeEnum } from '@/util/enums/feature.code.enum';
import { RoleEnum } from '@/util/enums/role.enum';

type MenuList = {
  name: string;
  icon: JSX.Element;
  path: string;
  active: boolean;
  disabled: boolean;
  code: FeatureCodeEnum;
  roles?: RoleEnum[] | null;
};

type MenuHook = {
  menuUsers: () => MenuList[];
};

type GenerateMenuSection = {
  menuList: MenuList[];
  title: string;
};

export { MenuList, MenuHook, GenerateMenuSection };
