import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/interfaces/category';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentTemp, APPOINTMENT_STATE, ApptmState } from 'src/app/interfaces/appointment-temp';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { MainViewService } from '../../../main-view/main-view.service';
import { Appointment } from 'src/app/interfaces/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Teller } from 'src/app/interfaces/teller';
//import { ParamsTicketMigration, TicketsMigrationComponent } from './pages/tickets-migration/tickets-migration.component';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { AppointmentTempService } from 'src/app/services/appointment-temp.service';
import { DatePipe } from '@angular/common';
import { GlobalHelpers } from 'src/app/global/helpers/global.helpers';
import { MatPaginator } from '@angular/material/paginator';
import { PeriodService } from 'src/app/services/period.service';
import { Period } from 'src/app/interfaces/period';
import { MONTHS } from 'src/app/interfaces/done-by-month';
import { StatementService } from 'src/app/services/statement.service';
import { DBusinessPeriod } from 'src/app/interfaces/d-business-period';
import { User } from 'src/app/interfaces/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-statements',
  templateUrl: './statements.component.html',
  styleUrls: ['./statements.component.scss']
})
export class StatementsComponent {

  periods:Period[]=[]
  dBusinessPeriods:DBusinessPeriod[]=[]
   MONTHS=MONTHS
  


  private _prdsId:number=0;
  @Input() public set prdsId (v:number){
    this._prdsId=v;
    this.getStatementsByMonth()
  }
  private _dbmMonth:number=0;
   @Input() public set dbmMonth (v:number){
    this._dbmMonth=v;
    this.getStatementsByMonth()
  }

  private _ln:number=-2;
  @Input() public set  ln(v:number){
    this._ln=v
    this.getStatementsByMonth()
  }
  




  private hqId:number=0
  isLoading: boolean = false
  /*Combo box */
  categories: Category[] = [];
  tellers: Teller[] = []

  apptmStates:ApptmState[]=[
    {apptmStateId:APPOINTMENT_STATE.PENDING, apptmStateName:"Pendiente"},
    {apptmStateId:APPOINTMENT_STATE.CURRENT_ATTENTION, apptmStateName:"En atención"},
    {apptmStateId:APPOINTMENT_STATE. ATTENDED, apptmStateName:"Atendido"},
  ]

  selectedCategory: number = 0
  selectedTeller: number = 0
  selectedApptmState:number=0


  //displayedColumns: string[] = ['select', 'position', 'ticket', 'apptmDateTimePrint','teller', 'category','doc-name', 'state' ];
  displayedColumns: string[] = ['position', 'ticket', 'apptmDateTimePrint','teller', 'category','doc-name', 'state' ];
  dataSource = new MatTableDataSource<DBusinessPeriod>();
  selection = new SelectionModel<DBusinessPeriod>(true, []);
  //@ViewChild(MatPaginator) paginator!: MatPaginator;

  
  /*Parametros para buscar*/
  dateStart:Date=new Date(new Date().getFullYear(), new Date().getMonth(),1)
  dateEnd:Date=new Date()
  
  
  users:User[]=[]

  constructor(
    
    private dialog: MatDialog, 
    private showMessage:ShowMessageService,
    private mainViewService:MainViewService,
    private datepipe: DatePipe,

    private periodService:PeriodService,

    private statementsService:StatementService

  ) { }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;


  }
  ngOnInit(): void {
    //this.listenRoute(o=>this.readCategory(o))
    //this.listenRoute(o=>this.readTeller(o))
  this.listenRoute((a)=>{})
    //this.listenRoute(o=>this.readAppointmentTempCRUD(o, this.selectedTeller,this.selectedCategory,this.selectedApptmState ))

    this.getAllPeriods();
  }
  private listenRoute(c:(o:any)=>void){
    this.mainViewService.getParams().subscribe(params=>{
      this.hqId = parseInt(params['hqId'] || 0)
      c(this.hqId)
    })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  /*isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }*/

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  /*masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }*/

  /** The label for the checkbox on the passed row */
  /*checkboxLabel(row?: Appointment): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.apptmId}`;
  }*/

  //
  joinCodeTicket(element: AppointmentTemp) {
    return element.catCode + String(element.apptmNro).padStart(2, '0')
  }

  //dialog
  
  //select search
  selectSearch(){
    let  dateStart = this.datepipe.transform(this.dateStart, 'yyyy/MM/dd') || '';
    let dateEnd = this.datepipe.transform(this.dateEnd, 'yyyy/MM/dd') || '';
  }

 /* filterTeller(tellId:number):TTellerJoinPerson{
    return this.tellers.filter(t=>t.tellId==tellId)[0]
  }

  filterCategory(catId:number):Category{
    return this.categories.filter(c=>c.catId==catId)[0]
  }*/

  


  /*  /*Open modal */
  /*openDialogMigration(): boolean {
    const dialogRef = this.dialog.open(TicketsMigrationComponent, {
      panelClass: 'dialog',
      data: {
        row: null,
        type: TYPES_ACTIONS_DIALOG.ADD
      }
    });
    dialogRef.afterClosed().subscribe((result: ParamsTicketMigration) => {
      if (result) {
        this.migrateTickets(this.hqId, result.migrateToday)
      }
    });
    return false;
  }*/

  /*AÑos */


  formatDateAndHour=(date:Date)=>GlobalHelpers.formatDateAndHour(date)
  
 

  public subString=(s:string)=>GlobalHelpers.subString(s,40)
  convertSecondsToHHMMSS=(...s:string[])=>{ return GlobalHelpers.convertSecondsToHHMMSS(s.reduce((a,b)=>a+parseInt(b), 0))}


  private getAllPeriods(){
    this.periodService.all().subscribe({
      next:e=>{
        this.periods=e.data as Period[]
      },
      error:e=>{

      }
    })
  }

  getStatementsByMonth=()=>this.statementsByMonth(this._dbmMonth, this._prdsId, this._ln);

  private  statementsByMonth(dbmMonth:number, prdsId:number, ln:number){
    this.isLoading=true;
    this.statementsService.statementsByMonths({dbmMonth, prdsId, ln}).subscribe({
      next: d=>{
        this.dataSource.data=d.data.dBusinessesPeriod as DBusinessPeriod[]
        this.users=d.data.users as User[]

        console.log(d)
        this.isLoading=false;
      }, 
      error:e=>{
        this.isLoading=false;
      }
    })
  }

  printReportTasks() {
    window.open(
      environment.API_URL + `/v1/reports/tasks-by-sub-period?prdsId=${this._prdsId}&dbmMonth=${this._dbmMonth}&ln=${this._ln}`
    );
  }
}
