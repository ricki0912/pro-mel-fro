import { ParentInterface } from "../parents/parent.interface";

export interface CrudInterface{
    createCRUD(object: ParentInterface | any | null):boolean
    readCRUD():boolean
    updateCRUD( object: ParentInterface | any | null, id: number | string | null):boolean
    deleteCRUD(ids: number | string | number[]| string[]| null):boolean
    
}