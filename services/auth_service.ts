import { UserInteface } from '@/interfaces/user_interface';

export default class AuthService {
  public login(username: string, password: string): Promise<UserInteface> {
    return Promise.resolve({
      email: '',
      id: '0',
      name: '',
      roles: [
        {
          id: '1',
          name: 'Solicitante',
          status: 'SIM',
          description: 'Solicitante',
        },
      ],
      token: 'fake',
    });
  }

  public logout(): void {}
}
