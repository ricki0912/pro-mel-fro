import { ParentInterface } from "../global/parents/parent.interface";

export interface DBusinessPeriod extends ParentInterface{
  dbpId?: number,
  prdsId?: number,
  bussId?: number,
  dbpState?: number,
  dbpCost?: number,
    dbpCostDate?: Date,

    dbpDebt?:number,
    dbpDebtDate?: Date,

    dbpPaid?:number
    dbpPaidDate?:Date,
}

export enum DBP_STATE{
  ENABLE=1, DISABLE=2
}
