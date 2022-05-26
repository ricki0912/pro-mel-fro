import { ParentInterface } from "../global/parents/parent.interface";

export interface DBusinessPeriod extends ParentInterface{
  dbpId?: number,
  prdsId?: number,
  bussId?: number,
  dbpState?: number
}

export enum DBP_STATE{
  ENABLE=1, DISABLE=2
}
