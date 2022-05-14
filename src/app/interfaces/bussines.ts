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
  bussDateMembership ?: Date,
  bussDateStartedAct ?: string,
  bussState ?: string,
  bussStateDate ?: string,
  bussFileKind ?: string,
  bussFileNumber ?: number,
  bussRegime ?: string,
  bussKindBookAcc ?: string,
  bussTel ?: string,
  bussEmail ?: string,
  bussObservation ?: string,
  perId ?: number,
  person: Person
}
