import { ParentInterface } from '../global/parents/parent.interface';
import { AnnualResumeDetails } from './annual-resume-details';

export interface AnnualResume extends ParentInterface {
  arId?: number;
  arDescription?: string;
  arState?: number /*1=Editable, 2=No editable,*/;

  prdsId?: number;
  bussId?: number;
  annualResumeDetails?: AnnualResumeDetails[];
}

export enum ANNUAL_RESUME_STATES {
  ENABLE = 1,
  DISABLE = 2,
}
