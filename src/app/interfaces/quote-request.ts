import { ParentInterface } from "../global/parents/parent.interface";

export interface QuoteRequest extends ParentInterface{
  quoteReqId?: number,
  quoteReqFullName: string,
  quoteReqMobilePhone: string,
  quoteReqCompanyName: string,
  quoteReqEmail: string,
  quoteReqServiceInterest: string,
  quoteReqMonthlyInvoices: string,
  quoteReqMessage: string,
  quoteReqDataConsent: boolean,
  quoteReqRegDate?: Date,
  quoteReqState?: number,
  quoteReqStateDate?: Date,
  quoteAssignedToTellId?: number,
  quoteReqComment?: string,

}
export enum QUOTE_REQUESTS_STATE{
  PENDING =1, ASSIGNED=2, COMPLETED=3
}
