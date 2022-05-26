import { ParentInterface } from "../global/parents/parent.interface";


export interface PaymentDetail extends ParentInterface{
  pdsQuantity?:number,
  spId?:number,
  /*
  'pdsPeriod' varchar(20),
  'pdsYear' int,*/

  pdsDescription?:string,
  
  pdsUnitPrice?:number,
  pdsAmount?:number,

}

