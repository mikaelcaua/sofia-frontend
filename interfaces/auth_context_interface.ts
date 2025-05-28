import User from './user_interface';

export default interface AuthContextInterface {
  user: User | null
  isAuthenticated: boolean
  login: (email:string,password:string) => void
  logout: () => void
}