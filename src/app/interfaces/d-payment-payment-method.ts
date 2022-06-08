import { ParentInterface } from "../global/parents/parent.interface";

export interface DPaymentPaymentMethod extends ParentInterface{
  dppmId?:number,
  payId?:number,
  paymthdsId?:number, 
  dppmAmount?:number
  dppmDescription?:string
}


