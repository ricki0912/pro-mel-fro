import { ParentInterface } from "src/app/global/parents/parent.interface"

export interface Password extends ParentInterface{
    passwordOld:string
    passwordNew:string
    passwordNewRepet:string
}
