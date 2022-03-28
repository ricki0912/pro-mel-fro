import { ParentInterface } from "../global/parents/parent.interface";
import { Person } from "./person";


export interface User extends ParentInterface {
    id?:number
    name: string,
    email: string,
    password: string,
    person: Person
}
