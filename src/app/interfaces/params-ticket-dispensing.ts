import { ParentInterface } from "../global/parents/parent.interface";
export interface ParamsTicketDispensing extends ParentInterface{
  dateTicket: string,
      numberTicket: string,
      tellerTicket: string,/*ventanilla*/
      phraseTicket: string,
      codeQrTicket: string,
  }
  