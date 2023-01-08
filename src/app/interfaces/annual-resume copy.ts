import { ParentInterface } from '../global/parents/parent.interface';

export interface AnnualResume extends ParentInterface {
  arId?: number;
  arDescription?: string;
  arState?: number /*1=Editable, 2=No editable,*/;

  prdsId?: number;
  bussId?: number;
}

export enum ANNUAL_RESUME_STATES {
  ENABLE = 1,
  DISABLE = 2,
}
