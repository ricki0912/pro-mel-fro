import { ParentInterface } from "../global/parents/parent.interface";

export interface Headquarter extends ParentInterface{
  hqId?:number, 
  hqName: string, 
  hqRUC?:string,
  hqAddress?:string,

  hqTel?:string,
  hqEmail?:string
}
