import { ParentInterface } from "../global/parents/parent.interface";
import { Person } from "./person";

export interface Bussines extends ParentInterface{
  bussId ?: number,
  bussKind ?: string,
  bussName ?: string,
  bussRUC ?: string,
  bussAdress : string,
  bussSunatUser : string,
  bussSunatPass : string,
  bussCodeSend : string,
  bussCodeRNP : string,
  bussDateMembership ?: Date,
  bussDateStartedAct : string,
  bussState : string,
  bussStateDate : string,
  bussFileKind ?: string,
  bussFileNumber ?: number,
  bussRegime : string,
  bussKindBookAcc : string,
  bussTel : string,
  bussEmail : string,
  bussObservation : string,
  perId ?: number,
  person: Person
}
