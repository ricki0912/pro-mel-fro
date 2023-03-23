import { ParentInterface } from "../global/parents/parent.interface";
import { DoneByMonth } from "./done-by-month";

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


  doneByMonths?:DoneByMonth[]
}

export enum DBP_STATE{
  ENABLE=1, DISABLE=2
}
