import { ParentInterface } from "src/app/global/parents/parent.interface";
import { Permission } from "src/app/interfaces/permission";
import { Person } from "src/app/interfaces/person";
import { Role } from "src/app/interfaces/role";

export type Roles='ADMINISTRADOR' | 'USUARIO'

export interface User extends ParentInterface{
  email: string;
  password: string;
  id?:number
  name: string,
  person: Person,
  roles?:Role[],
  permissions?:Permission[] | {} | []
  tellers?:[]
  state:number
}

export interface UserResponse{
  userResMessage:string;
  userResToken: string;
  userResId: number;
  userResRole: Roles
}



