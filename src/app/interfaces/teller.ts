import { ParentInterface } from "../global/parents/parent.interface";

export enum TELLER_TYPES_STATE {
  ACTIVO=1,
  EN_ESPERA=2,
  ACTIVO_NAME="Activo",
  EN_ESPERA_NAME="En Espera"
}
export interface Teller extends ParentInterface{
  tellId?: number;
  tellCode?: string;
  tellName: string;
  tellColor?: string;
  tellMaxInWait?:number;
  tellState?: number;
  hqId?:number;
  userId?:number;
}


export interface TTellerJoinPerson {
  tellId?: number;
  tellCode?: string;
  tellName?: string;
  tellMaxInWait?: number;
  tellState?: number;
  hqId?: number;
  userId?: number;
  updated_at?: string;
  created_at?: string;
  perId?: number;
  perKindDoc?: string;
  perNumberDoc?: string;
  perName?: string;
  perAddress?: string;
  perTel?: string;
  perEmail?: string;

  callPending?:number;
}
