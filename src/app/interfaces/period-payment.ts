import { ParentInterface } from "../global/parents/parent.interface";

export interface PeriodPayment extends ParentInterface {
  ppayId?: number,
  ppayName?: string,
  ppayState?: string
}


export enum PERIOD_PAYMENT_STATE{
  ENABLE=1, DISABLE=2
}
