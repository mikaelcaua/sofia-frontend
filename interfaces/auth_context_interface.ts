import { UserInteface } from './user_interface';

export interface AuthContextInterface {
  user: UserInteface | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}
