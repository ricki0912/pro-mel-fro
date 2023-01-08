import { ParentInterface } from '../global/parents/parent.interface';

export interface AnnualResumeDetails extends ParentInterface {
  ardId?: number;
  arId?: number;
  ardMonth?: number;

  ardTaxBase?: number;
  ardTax?: number;
  ardTotal?: number;
  ardPlame?: number;
  ardFee?: number;
}
