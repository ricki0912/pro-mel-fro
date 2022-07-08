import { ParentInterface } from "../global/parents/parent.interface";

export interface PrintServer extends ParentInterface{
    psId?:number,
    psTitle?:string,
    psUrl?:string,
    psCopies?:number,
    psStateAnswer?:number
    tellId?:number
    hqId?:number
    psMessage?:string
}

export enum PRINT_SERVER_ANSWER_RESPONSE{
    DOWWLOADING= 1, DOWNLOADED=2, DOWNLOAD_ERROR=3,
    SEARCHING_PRINTER=6, SENDING_PRINT=7, PRINT_ERROR=8, 
    PRINT_PENDING=10
}

