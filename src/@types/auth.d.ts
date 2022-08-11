import { UserProps } from '@context/auth.context';

import { User } from '@pages/api/models/user';

export type AuthContextProps = {
  user: User | null;
  isLoading: boolean;
  featuresArray: string[];
  setTokenUser: (token: string) => void;
  handleSignOut: () => void;
  handleSignIn: (user: UserProps) => Promise<string>;
};
