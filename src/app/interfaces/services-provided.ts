import { ParentInterface } from "../global/parents/parent.interface";

export interface ServicesProvided extends ParentInterface {
  spId?: number,
  dbpId?: number,
  svId?: number,
  spPeriodPayment?: number,
  spName?: string,
  spCost?: number,
  spCostDate?: Date,
  spDebt?: number,
  spDebtDate?: Date,
  spPaid?: number,
  spPaidDate?: Date,
  spState?: number,
  spComment?: string,
  spLimitPaymentDate?: string,
  spMaxPartToPay?: number
}
