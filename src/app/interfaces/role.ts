import { ParentInterface } from "../global/parents/parent.interface";

export interface Role extends ParentInterface{
    id?:number,
    name?:string,
    guard_name?:string,
}

