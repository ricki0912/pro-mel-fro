import { ParentInterface } from "../parents/parent.interface";

export enum TYPES_ACTIONS_DIALOG {
    ADD= '1',
    UPD='2'
}

export interface ActionDialogInterface{
    openDialogAdd( object: ParentInterface | any | null):boolean
    openDialogUpd( object: number| string| ParentInterface | any | null):boolean
    openDialogdAddAndUpd( object: ParentInterface | any | null): boolean
}