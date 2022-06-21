import { ParentInterface } from "../global/parents/parent.interface";

export interface CopyToClipboard extends ParentInterface{
    copiedWord?:string,
    keyName?:string,
}

