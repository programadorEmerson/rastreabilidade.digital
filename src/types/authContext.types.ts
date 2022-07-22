import { UserProps } from './user.types';

export type AuthContextProps = {
  user: UserProps | null;
  handleSignIn: (user: UserProps) => void;
};
