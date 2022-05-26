import { ParentInterface } from "../global/parents/parent.interface";

export interface Services extends ParentInterface {
  svId?: number,
  svName?: string,
  svState?: string
}

export enum SERVICE_STATE{
  ENABLE=1, DISABLE=2
}
