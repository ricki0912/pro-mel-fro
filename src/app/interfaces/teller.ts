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
  tellMaxInWait?:number;
  tellState?: number;
  hqId?:number;
  userId?:number;
}
