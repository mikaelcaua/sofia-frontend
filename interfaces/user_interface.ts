import { RoleInterface } from './role_interface';

export interface UserInteface {
  id: string;
  name: string;
  email: string;
  roles: RoleInterface[];
}
