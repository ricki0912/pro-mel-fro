import {  ParentInterfaceWithDU } from "../global/parents/parent.interface";
import { PaymentDetail } from "./payment-detail";

export interface ServicesProvided extends ParentInterfaceWithDU {
  spId?: number,
  dbpId?: number,
  svId?: number,
  ppayId?:number,
  spPeriodPayment?: number,
  spName?: string,
  spCost?: number,
  spCostDate?: Date,
  spDebt?: number,
  spDebtDate?: Date,
  spPaid?: number,
  spPaidDate?: Date,
  spState?: number,
  spComment?: string,
  spLimitPaymentDate?: string,
  spMaxPartToPay?: number
  spCommentColourText?:string
  payment_details?:PaymentDetail[]
}

export interface TServicesProvided extends ServicesProvided{
  spEditable?:boolean
}



  /*"spPeriodPayment" INTEGER,*/
      


 