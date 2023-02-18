import { ParentInterface } from '../global/parents/parent.interface';
import { DDoneByMonthTasks } from './d_done_by_month_tasks';

export interface DoneByMonth extends ParentInterface {
  dbmId?:number,
    
  dbpId?:number,
  dbmMonth?:number, /*Mes pude ser del uno al 13*/ 

  dbmState:number,
  dDoneByMonthTasks:DDoneByMonthTasks[]
}

export enum DONE_BY_MONTH_STATE{
  PENDING=1, CLOSED=2
}


export const MONTHS: Month[] = [
  { id: 1, name: 'ENERO' },
  { id: 2, name: 'FEBRERO' },
  { id: 3, name: 'MARZO' },
  { id: 4, name: 'ABRIL' },
  { id: 5, name: 'MAYO' },
  { id: 6, name: 'JUNIO' },
  { id: 7, name: 'JULIO' },
  { id: 8, name: 'AGOSTO' },
  { id: 9, name: 'SETIEMBRE' },
  { id: 10, name: 'OCTUBRE' },
  { id: 11, name: 'NOVIEMBRE' },
  { id: 12, name: 'DICIEMBRE' },
  { id: 13, name: 'ANUAL' },

];

interface Month {
  id: number;
  name: string;
}

