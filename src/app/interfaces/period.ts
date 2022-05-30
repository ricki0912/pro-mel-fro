import { ParentInterface } from "../global/parents/parent.interface";
import { DBusinessPeriod } from "./d-business-period";

export interface Period extends ParentInterface{
  prdsId?: number,
  prdsNameShort?: string,
  prdsDescription?:string,
  prdsState?:number,
  dbp? : DBusinessPeriod

}
export enum PERIOD_STATE{
  ENABLE=1, DISABLE=2
}