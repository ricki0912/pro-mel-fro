import { ParentInterface } from "../global/parents/parent.interface";
import { DPaymentPaymentMethod } from "./d-payment-payment-method";

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
  payToken?:string,
  
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

  
  
 /*Igv 09/06/2022*/
 payTaxAcumulate?:number, /*1=Acumulado, 2=NO acumulado*/
 paySubPreviusTotal?:number, /*El total previo*/ 
 /*Igv 09/06/2022*/
 /*Campos para clientes no registrados*/
 
 payTotalTaxBase?:number,
 payTaxPercent?:number, 

 payIsCanceled?:number,/*1=cancelado, 2=no cancelado*/
 
 payTicketSN?:string,
 payInvoiceSN?:string,

  paymentDetails?:PaymentDetail[],
  dPaymentPaymentMethods?:DPaymentPaymentMethod[]
}

export enum PAYMENT_STATE{
  BORRADOR=1, PENDING=2, FILLED=3
}

export enum PAYMENT_KIND_DOC{
  RECIBO=1, BOLETA=2, FACTURA=3
}

export enum PAYMENT_KIND_CANCELED {
  CANCELED=1, NO_CANCELED=2
}


