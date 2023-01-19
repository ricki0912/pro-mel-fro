import { ParentInterface } from "../global/parents/parent.interface";
import { Person } from "./person";


export interface Bussines extends ParentInterface{
  bussId ?: number,
  bussKind ?: string,
  bussName ?: string,
  bussRUC ?: string,
  bussAddress ?: string,
  bussSunatUser ?: string,
  bussSunatPass ?: string,
  bussCodeSend ?: string,
  bussCodeRNP ?: string,
  bussAfpUser ?: string,
  bussAfpPass ?: string,
  bussDetractionsPass ?: string,
  bussSimpleCode ?: string,
  bussSisClave ?: string,
  bussDateMembership ?: Date,
  bussDateStartedAct ?: string,
  bussState ?: string,
  bussStateDate ?: Date,
  bussFileKind ?: string,
  bussFileNumber ?: number,
  bussRegime ?: string,
  bussKindBookAcc ?: string,
  bussTel ?: string,
  bussTel2 ?: string,
  bussTel3 ?: string,
  bussEmail ?: string,
  bussObservation ?: string,
  tellId ?: number,
  perId ?: number,
  person: Person

  bussComment?:string

   created_at?:Date
}

export interface TellerJoinUsers {
  tellId?: number;
  tellCode?: string;
  tellName?: string;
  name?: string;
  hqId?: number;
  cantBusiness?: number;

  tellState?: number;

}

export enum BUSSINES_STATE{
   ENABLE=1,  SUSPENDED=2, RETIRED=3

}

export enum BUSSINES_COLOR{
  ENABLE='#28a745',
  SUSPENDED='#dc3545',
  RETIRED='#ffc107'
}

