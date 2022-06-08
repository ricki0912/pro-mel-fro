import { ParentInterface } from "../global/parents/parent.interface";

export interface PaymentMethod extends ParentInterface{
  paymthdsId?:number,
  paymthdsName?:string,
  paymthdsState?:number, 
}

export enum PAYMENT_METHOD_STATE{
  ENABLE=1, DISABLE=2
}


