

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { ActionDialogInterface, TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { CrudInterface } from 'src/app/global/interfaces/crud.interface';
import { Cards } from 'src/app/interfaces/cards';
import { DDoneByMonthTasks, D_DONE_BY_MONTH_TASKS_RECTIFIED, D_DONE_BY_MONTH_TASKS_STATE } from 'src/app/interfaces/d_done_by_month_tasks';
import { Task as TaskH,TASK_ELSE_ALTERNATIVE,TASK_RECTIFY,TASK_TYPE_INPUT } from 'src/app/interfaces/task';
import { User } from 'src/app/interfaces/user';
import { CardsService } from 'src/app/services/cards.service';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';

import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
   private _users:User[]=[]
  @Input() set users(v:User[]){
    this._users=v
  }
  @Input() dDoneByMonthTask:DDoneByMonthTasks={ddbmtState:D_DONE_BY_MONTH_TASKS_STATE.CREATED_FIRST_TIME}
  
  

  TASK_TYPE_INPUT=TASK_TYPE_INPUT
  D_DONE_BY_MONTH_TASKS_STATE= D_DONE_BY_MONTH_TASKS_STATE  
  TASK_ELSE_ALTERNATIVE=TASK_ELSE_ALTERNATIVE
  TASK_RECTIFY=TASK_RECTIFY
  D_DONE_BY_MONTH_TASKS_RECTIFIED=D_DONE_BY_MONTH_TASKS_RECTIFIED


  arrayMain:Option[]=[]
  constructor(
    private tokenService:TokenStorageService
  ){ 
    
  }
  changeIsDone(){
    this.dDoneByMonthTask.ddbmtDoneBy=(this.dDoneByMonthTask.ddbmtIsDoneTask)?this.tokenService.getUser()?.id:undefined  
    this.dDoneByMonthTask.ddbmtState=(this.dDoneByMonthTask.ddbmtIsDoneTask)?D_DONE_BY_MONTH_TASKS_STATE.PENDING_TO_SAVE:D_DONE_BY_MONTH_TASKS_STATE.PENDING
  }  
  
  getUser=(userId:number)=>this._users.find(e=>e.id==userId)



  @Input() card: Cards = {};
  @Output() onDel = new EventEmitter<Cards>();
  /*constructor(
    public dialogEditCard: MatDialog,
    public cardsService: CardsService,
    private showMessage: ShowMessageService
  ) { }*/

  ngOnInit(): void {
    this.prepareArrayOfOptions()
  }

  private prepareArrayOfOptions(){
    let options = this.getArrayOfOptions(this.dDoneByMonthTask.task?.tsksOptionsValue, this.dDoneByMonthTask.task?.tsksOptionsSplit)
    let optionsSelected=this.getArrayOfOptions(this.dDoneByMonthTask.ddbmtOptionsByComa, this.dDoneByMonthTask.task?.tsksOptionsSplit)

    this.arrayMain = options.map(e=>{
      let optionSelected=optionsSelected.find(a=>e==a)
      let isSelected=(e==optionSelected)?true:false
      let option:Option={value:e, selected:isSelected }
      return option
    })

  }

  public setOption(o:Option){
    let optionsSelected=this.arrayMain.filter(e=>e.selected)
    let optionsValues=optionsSelected.map(e=>e.value)
    let optionsConcated=optionsValues.join(this.dDoneByMonthTask.task?.tsksOptionsSplit)
    
    this.dDoneByMonthTask.ddbmtOptionsByComa=optionsConcated
  }

  getArrayOfOptions(tsksOptionsValue:string | undefined, tsksOptionsSplit:string | undefined){
      if(tsksOptionsValue && tsksOptionsSplit){
        return this.generateArrayOptions(tsksOptionsValue, tsksOptionsSplit)
      }
      return []
  }

  private generateArrayOptions(options:string, separator:string){
    console.log(options, separator)
    return options.split(separator)
  }

  //
  rectify(){
    this.dDoneByMonthTask.ddbmtRectified=D_DONE_BY_MONTH_TASKS_RECTIFIED.PENDING_TO_SAVE
    //this.dDoneByMonthTask.ddbmtState=D_DONE_BY_MONTH_TASKS_STATE.PENDING_TO_RECTIFY
  }

  doSomethingElse(s:D_DONE_BY_MONTH_TASKS_STATE.PENDING_NOT_DONE){
    this.dDoneByMonthTask.ddbmtState=s
    
  }

}
interface  Option{
  value:string,
  selected:boolean
}
