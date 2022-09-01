import { ParentInterface } from "../global/parents/parent.interface";
import { PaymentMethod } from "./payment-method";

export interface DPaymentPaymentMethod extends ParentInterface{
  dppmId?:number,
  payId?:number,
  paymthdsId?:number, 
  dppmAmount?:number
  dppmDescription?:string
  paymentMethod?:PaymentMethod
}


