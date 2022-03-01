export type Roles='ADMINISTRADOR' | 'USUARIO'

export interface User{
  userName: string;
  userPassword: string;
}

export interface UserResponse{
  userResMessage:string;
  userResToken: string;
  userResId: number;
  userResRole: Roles
}

