import { ParentInterface } from "src/app/global/parents/parent.interface";

export type Roles='ADMINISTRADOR' | 'USUARIO'

export interface User extends ParentInterface{
  email: string;
  password: string;
}

export interface UserResponse{
  userResMessage:string;
  userResToken: string;
  userResId: number;
  userResRole: Roles
}

