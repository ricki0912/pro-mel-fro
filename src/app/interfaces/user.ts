import { ParentInterface } from "../global/parents/parent.interface";
import { Permission } from "./permission";
import { Person } from "./person";
import { Role } from "./role";
import { Teller } from "./teller";


export interface User extends ParentInterface {
    id?:number
    name: string,
    email: string,
    password: string,
    person: Person,
    roles?:Role[],
    permissions?:Permission[] | {} | []
    tellers?:Teller[]
    img?:string
    

}
