import { ParentInterface } from "../global/parents/parent.interface";

import {PaymentDetail} from './payment-detail'
export interface Payment extends ParentInterface{
  payId?:number
  payState?:number , /*1=Borrador, 2=Facturado*/
  apptmId?:number
  hqId?:number ,/*sede*/
  payKindDoc?:number ,/*Recibo, Boleta, Factura*/
  paySerie?:string , /*Serie */
  payNumber?:number , /*Numero correlativo*/

  payDatePrint?:Date ,
  
  bussId?:number,

  tellId?:number ,
  
  /*CLientes sin regisgro en base de datos*/
  payClientName?:string,
  payClientAddress?:string,
  payClientTel?:string,
  payClientEmail?:string,
  payClientRucOrDni?:string,
  /*Campos para clientes no registrados*/

  paySubTotal?:number,
  payDiscount?:number ,
  paySalesTax?:number , 
  payTotal?:string,
  payTotalInWords?:string,

  paymentDetails?:PaymentDetail[]
}

export enum PAYMENT_STATE{
  BORRADOR=1, PENDING=2, FILLED=3
}

export enum PAYMENT_KIND_DOC{
  RECIBO=1, BOLETA=2, FACTURA=3
}


