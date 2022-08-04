import { UserProps } from '@context/auth.context';

export type AuthContextProps = {
  user: UserProps | null;
  handleSignIn: (user: UserProps) => void;
};
