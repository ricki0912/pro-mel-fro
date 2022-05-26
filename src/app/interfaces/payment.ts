import { ParentInterface } from "../global/parents/parent.interface";

import {PaymentDetail} from './payment-detail'
export interface Payment extends ParentInterface{
  payState?:number , /*1=Borrador, 2=Facturado*/
    
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
  payRucOrDni?:string,
  /*Campos para clientes no registrados*/

  paySubTotal?:number,
  payDiscount?:number ,
  paySalesTax?:number , 
  payTotal?:string,
  payTotalInWords?:string,

  paymentDetails?:PaymentDetail[]
}

