import { UserProps } from '@context/auth.context';

import { User } from '@pages/api/models/user';

export type AuthContextProps = {
  user: User | null;
  isLoading: boolean;
  handleSignOut: () => void;
  handleSignIn: (user: UserProps) => Promise<void>;
};
