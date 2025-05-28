import UserInteface from "@/interfaces/user_interface";

export default class AuthService {
  
  public login(username: string, password: string): UserInteface {
    return {
        email:'',
        id:0,
        name:'',
        roles: []
    }
  }

  public logout(): void {
    
  }
}