

  import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { GlobalHelpers } from 'src/app/global/helpers/global.helpers';
import { Bussines, BUSSINES_COLOR, BUSSINES_STATE } from 'src/app/interfaces/bussines';
import { DBusinessPeriod } from 'src/app/interfaces/d-business-period';
import { DoneByMonth, DONE_BY_MONTH_STATE, MONTHS } from 'src/app/interfaces/done-by-month';
import { DDoneByMonthTasks, D_DONE_BY_MONTH_TASKS_STATE } from 'src/app/interfaces/d_done_by_month_tasks';
import { Period } from 'src/app/interfaces/period';
import { Task as TaskH, TASK_KIND_DECL, TASK_STATES } from 'src/app/interfaces/task';
import { User } from 'src/app/interfaces/user';
import { BussinesService } from 'src/app/services/bussines.service';
import { DoneByMonthService } from 'src/app/services/done-by-month.service';
import { PeriodService } from 'src/app/services/period.service';
import { TaskService } from 'src/app/services/task.service';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-add-task-by-client',
  templateUrl: './add-task-by-client.component.html',
  styleUrls: ['./add-task-by-client.component.scss']
})
export class AddTaskByClientComponent {
  loading: boolean = false;

  bussines:Bussines
  dbp?:DBusinessPeriod
  dbm?:DoneByMonth
  users:User[]=[]
  
  tasks:TaskH[]=[]
  tellId: number | undefined;
  bussState: number = BUSSINES_STATE.ENABLE;
  prdsId: number = 0;

  month: number | undefined = MONTHS.find(
    (e) => e.id == GlobalHelpers.monthBefore().getMonth() + 1
  )?.id;

  MONTHS = MONTHS;
  BS = BUSSINES_STATE;

  public periods: Period[] = [];

  title = 'Seguimiento';
  constructor(
    private dialogRef: MatDialogRef<AddTaskByClientComponent>,
    private periodService: PeriodService,
    private showMessage: ShowMessageService,
    private tokenStorage: TokenStorageService, 
    private taskService:TaskService, 
    private dbmService:DoneByMonthService,
    private bussinesService:BussinesService,
    public dialog: MatDialog,
    
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { business: Bussines }, /**campturamos el usuario que se recibe com parametro cuando abrimos el modal */

  ) {
    this.bussines=paramsDialog.business;
  }

  ngOnInit(): void {
    //this.getDataPeriods(()=>this.getDoneByMonths());
    if(this.paramsDialog.business.bussId)this.getAllPeriodsByBuss(()=>this.getDoneByMonths(), this.paramsDialog.business.bussId)
    //this.getTaskEnable()
  }

  getColorBussState(bussState?: string) {
    switch (Number(bussState)) {
      case BUSSINES_STATE.ENABLE:
        return BUSSINES_COLOR.ENABLE;
      case BUSSINES_STATE.SUSPENDED:
        return BUSSINES_COLOR.SUSPENDED;
      case BUSSINES_STATE.RETIRED:
        return BUSSINES_COLOR.RETIRED;
      default:
        return '';
    }
  }

  public beforeAddUpd() {
    
    if(this.dbm){
      this.saveDoneByMonth(this.dbm)
    }
  }

private getAllPeriodsByBuss( f:()=>void, bussId:number){
  this.bussinesService.allDBusinesPeriods(bussId).subscribe({
    next: d=>{
      this.periods=d.data as Period[];
      let period = this.periods.find(
        (e) =>
          Number(e.prdsNameShort) == GlobalHelpers.monthBefore().getFullYear()
      );
      this.prdsId = period?.prdsId || 0;
      this.loading = false;
      f();
    },
    error: e=>{
      this.showMessage.error({message: e.error.message})
    }
  })
}

  /*private getDataPeriods(f:()=>void): boolean {

    this.loading = true;
    this.periodService.all().subscribe({
      next: (data) => {
        this.periods = data.data as Period[];
        let period = this.periods.find(
          (e) =>
            Number(e.prdsNameShort) == GlobalHelpers.monthBefore().getFullYear()
        );
        this.prdsId = period?.prdsId || 0;
        this.loading = false;
        f();
        
      },
      error: (error) => {
        this.showMessage.error({
          message: 'Al parecer surgio un error!. ' + error.message.message,
        });
      },
    });
    return false;
  }*/

  private getTaskEnable(){
    this.taskService.allBy({tsksState:TASK_STATES.ENABLE, tsksKindDecl:TASK_KIND_DECL.MONTHLY}).subscribe({
      next:e=>{
        this.tasks=e.data as TaskH[]

      },error:e=>{

      } 
    })
  }

  private addUpd(dbm:DoneByMonth){

    /*for(let element of dbm.dDoneByMonthTasks){
      if(element.ddbmtIsDoneTask){
        element.ddbmtState=D_DONE_BY_MONTH_TASKS_STATE.CLOSED
      }
    }*/

    console.log(dbm)
    this.loading = true;

    this.dbmService.addUpd(dbm).subscribe({
      next: e=>{
        this.dbm=e.data as DoneByMonth
        this.showMessage.success({message:e.msg})
        this.loading = false;

      }, 
      error:e=>{
        this.loading = false;
        console.log(e)
        this.showMessage.error({message:'Al parecer surgio un error '+e.error.message})
      }
    });
  }
  

  public getDoneByMonths(){
    console.log("Mes ", this.month)
    this.loading = true;

    this.dbmService.findByBusiness({bussId: this.bussines.bussId || 0,prdsId:this.prdsId, dbmMonth:this.month || 0, tsksKindDecl:TASK_KIND_DECL.MONTHLY})
      .subscribe({
        next:e=>{
          console.log("Hecho por mes ", e)
          this.tasks=e.data.task as TaskH[]
          this.dbm=e.data.dbm
          this.dbp=e.data.dbp
          this.users=e.data.users
          this.bussines=e.data.business
          if(this.dbp){
            let dbmTemp=this.prepareAndVerifyDoneByMonth({tasks:this.tasks, dbm:this.dbm, dbp:this.dbp, dbmMonth:this.month||0})
            this.dbm=dbmTemp
            console.log("Prepado", dbmTemp)
          }else{

          }

      this.loading = false;

          
        }, 
        error:e=>{
          this.loading = false;


        }
      });
  }

  private prepareAndVerifyDoneByMonth(p:{tasks:TaskH[], dbm:DoneByMonth | undefined, dbp:DBusinessPeriod, dbmMonth:number }):DoneByMonth{
    let { tasks, dbm, dbp , dbmMonth}= p
    if(!dbm){
      let dbmTemp:DoneByMonth = {dbpId: dbp.dbpId, dbmMonth: dbmMonth, dbmState:DONE_BY_MONTH_STATE.PENDING, dDoneByMonthTasks:[]}
      for (let v of tasks){
        let  ddbmt:DDoneByMonthTasks={
          tsksId:v.tsksId, 
          ddbmtIsDoneTask:false,
          ddbmtState:D_DONE_BY_MONTH_TASKS_STATE.PENDING, 
          task:v
        }
        dbmTemp.dDoneByMonthTasks.push(ddbmt)
      }
      return dbmTemp
    }

    return dbm
  }




    saveDoneByMonth(dbm:DoneByMonth) {
      this.wantSave(() => this.addUpd(dbm));
    }

    wantSave(d: () => void) {
      this.dialog
        .open(DialogConfirmationComponent, {
          data: `¿Esta seguro que desea guardar?.`,
        })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {
            d();
          } else {
          }
        });
    }

    /*addUpdCRUD(id: number): boolean {
      this.businessService.del(id)?.subscribe({
        next: (data) => {
          if (data.res) {
            this.showMessage.success({ message: data.msg });
          } else {
            this.showMessage.error({ message: data.msg });
          }
        },
        error: (error) => {
          this.showMessage.error({ message: error.error.message });
        },
      });
      return true;
    }*/

}

export interface state {
  name: string;
  value: number;
}

