import { ParentInterface } from '../global/parents/parent.interface';

export interface Task extends ParentInterface {
  tsksId?:number, 
  tsksName?:string, 
  tsksState?:number, 
  tsksKindDecl?:number,

  tsksTypeInput?:number,
  tsksLabelInput?:string, 

  tsksOptionsValue?:string,
  tsksOptionsSplit?:string,

  tsksRectify?:number,
  tsksElseAlternative?:number

  tsksLinkedAnnualResumeDetails?:number

}

export enum TASK_STATES {
  ENABLE=1, DISABLE=2
}

export enum TASK_KIND_DECL {
  MONTHLY = 1,
  ANNUALLY = 2,
}

export enum TASK_TYPE_INPUT{
  NUMBER=1, 
  DECIMAL=2,
  ARRAY_OF_OPTIONS=3,
  STRING=4,
  ANYONE=20
}

export enum TASK_RECTIFY{
  YES=1, 
  NO=2
}

export enum TASK_ELSE_ALTERNATIVE {
  NO_HAVE_PLAME=1,
  NO_SEND_LIBRO=2
}

export enum TASKS_LINKED_ANNUAL_RESUME_DETAILS{
  TOTAL=1,
  PLAME=2,
  ENYONE=20

}

