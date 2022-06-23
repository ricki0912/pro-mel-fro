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
  bussStateDate ?: string,
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
}

export interface TellerJoinUsers {
  tellId?: number;
  tellCode?: string;
  tellName?: string;
  name?: string;
  hqId?: number;
  cantBusiness?: number;
}
