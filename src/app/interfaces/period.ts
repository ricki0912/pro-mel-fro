import { ParentInterface } from "../global/parents/parent.interface";

export interface Period extends ParentInterface{
  prdsId?: number,
  prdsNameShort?: string,
  prdsDescription?:string,
  prdsState?:number,

}
export enum PERIOD_STATE{
  ENABLE=1, DISABLE=2
}