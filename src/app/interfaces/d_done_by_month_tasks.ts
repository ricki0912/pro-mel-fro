import { ParentInterface } from '../global/parents/parent.interface';
import { Task } from './task';

export interface DDoneByMonthTasks extends ParentInterface {
  ddbmtId?:number,  
  dbmId?:number,  
  tsksId?:number,    
  
  ddbmtCant?:number, 
  ddbmtAmount?:number,
  ddbmtOptionsByComa?:string,
  ddbmtShortComment?:string ,  
  
  
  ddbmtIsDoneTask?:boolean,  
  ddbmtState:number, /*1=Creado por primera vez,  2=pendiente, 3=guardado, 4=Cerrado*/ 
  ddbmtDoneAt?:Date,
  ddbmtRectifiedAt?:Date


  ddbmtRectified?:number,

  ddbmtDoneBy?:number,
  ddbmtRectifiedBy?:number   
  
  /*ddbmtClosedBy?:number */ 
  task?:Task

}

export enum D_DONE_BY_MONTH_TASKS_STATE{
    CREATED_FIRST_TIME=1,
    PENDING=2,
    PENDING_TO_SAVE=3,
    SAVED=4,
    CLOSED=5, 
    PENDING_NOT_DONE=6,
    NOT_DONE=7, 
    /**/
    /*PENDING_TO_RECTIFY=8,
    RECTIFIED=9*/

}

export enum  D_DONE_BY_MONTH_TASKS_RECTIFIED {
  PENDING_TO_SAVE=1,
  RECTIFIED=2
}

