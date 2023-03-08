import { Component, Input } from '@angular/core';
import { DDoneByMonthTasks, D_DONE_BY_MONTH_TASKS_STATE, D_DONE_BY_MONTH_TASKS_RECTIFIED } from 'src/app/interfaces/d_done_by_month_tasks';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-mini-card-tcard-task',
  templateUrl: './mini-card-tcard-task.component.html',
  styleUrls: ['./mini-card-tcard-task.component.scss']
})
export class MiniCardTcardTaskComponent {

  @Input() dDoneByMonthTask?:DDoneByMonthTasks
  @Input() users:User[]=[]

  D_DONE_BY_MONTH_TASKS_RECTIFIED=D_DONE_BY_MONTH_TASKS_RECTIFIED
  D_DONE_BY_MONTH_TASKS_STATE=D_DONE_BY_MONTH_TASKS_STATE
}
