import { Component, Input } from '@angular/core';
import { DoneByMonth, DONE_BY_MONTH_STATE, MONTHS } from 'src/app/interfaces/done-by-month';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-group-of-task-card',
  templateUrl: './group-of-task-card.component.html',
  styleUrls: ['./group-of-task-card.component.scss']
})
export class GroupOfTaskCardComponent {

  @Input() public users:User[]=[]
  public nameMonth='';
  @Input()  column:number=3
  doneByMonth_:DoneByMonth={dbmState:DONE_BY_MONTH_STATE.PENDING, dDoneByMonthTasks:[]}

  @Input()  set doneByMonth(v:DoneByMonth){
    this.doneByMonth_=v
    this.nameMonth=MONTHS.find(e=>e.id==v.dbmMonth)?.name || 'Seleccione un mes'
  }

  
  

}
