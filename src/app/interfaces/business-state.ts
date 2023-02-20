import { ParentInterface } from "../global/parents/parent.interface";

export interface BusinessState extends ParentInterface{
  
        bussId?:number,
        bussState?:string,
        bussStateDate:Date,
        bussComment?:string

        busssState:number,
}

