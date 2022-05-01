import { ParentInterface } from "../global/parents/parent.interface";

export interface Permission extends ParentInterface{
    id?:number,
    name?:string,
    name_to_see?:string
    guard_name?:string,
}

export interface TCBPermission extends Permission{
   selected:boolean
}

export interface OCBPermission extends ParentInterface{
    [key:string]:TCBPermission
}

