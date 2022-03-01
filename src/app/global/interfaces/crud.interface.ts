import { ParentInterface } from "../parents/parent.interface";

export interface CrudInterface{
    createCRUD(object: ParentInterface | any | null):boolean
    readCRUD():boolean
    updateCRUD(id: number | string | null, object: ParentInterface | any | null):boolean
    deleteCRUD(ids: number | string | number[]| string[]| null):boolean
    
}