import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/services/category.service';
import { Teller, TTellerJoinPerson } from 'src/app/interfaces/teller';
import { TellerService } from 'src/app/services/teller.service';
import { Category } from 'src/app/interfaces/category';
import { FindTellerComponent } from '../teller/pages/find-teller/find-teller.component';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentTempService } from 'src/app/services/appointment-temp.service';
import { AppointmentTemp, APPOINTMENT_STATE, ApptmState, TAppointmentTemp } from 'src/app/interfaces/appointment-temp';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { MainViewService } from '../main-view/main-view.service';
import { MatPaginator } from '@angular/material/paginator';
import { GlobalHelpers } from 'src/app/global/helpers/global.helpers';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})
export class TicketComponent implements OnInit {
  private hqId:number=0
  isLoading: boolean = false
  /*Combo box */
  categories: Category[] = [];
  tellers: TTellerJoinPerson[] = []
  ATS=APPOINTMENT_STATE

  apptmStates:ApptmState[]=[
    {apptmStateId:APPOINTMENT_STATE.PENDING, apptmStateName:"En Espera"},
    {apptmStateId:APPOINTMENT_STATE.CURRENT_ATTENTION, apptmStateName:"En ventanilla"},
    {apptmStateId:APPOINTMENT_STATE.ATTENDED, apptmStateName:"Atendido"},
  ]

  selectedCategory: number = 0
  selectedTeller: number = 0
  selectedApptmState:number=APPOINTMENT_STATE.PENDING


  displayedColumns: string[] = ['select', 'position','linkBuss', 'ticket','code_category' ,'teller', 'category', 'date_time', 'time'];
  dataSource = new MatTableDataSource<TAppointmentTemp>();
  selection = new SelectionModel<TAppointmentTemp>(true, []);


  clickedRows = new Set<TAppointmentTemp>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;


  }
  
  constructor(
    private categoryService: CategoryService,
    private tellerService: TellerService,
    private appointmentTempService: AppointmentTempService,
    private dialog: MatDialog, 
    private showMessage:ShowMessageService,
    private mainViewService:MainViewService
  ) { }

  ngOnInit(): void {
    this.listenRoute(o=>this.readCategory(o))
    this.listenRoute(o=>this.readTeller(o))
    this.listenRoute(o=>this.readAppointmentTempCRUD(o, this.selectedTeller,this.selectedCategory,this.selectedApptmState ))
  }
  private listenRoute(c:(o:any)=>void){
    this.mainViewService.getParams().subscribe(params=>{
      this.hqId = parseInt(params['hqId'] || 0)
      c(this.hqId)
    })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: TAppointmentTemp): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.apptmId}`;
  }

  //
  joinCodeTicket(element: AppointmentTemp) {
    return element.catCode + String(element.apptmNro).padStart(2, '0')
  }

  //dialog
  openDialogChageTeller() {
    const dialogRef = this.dialog.open(FindTellerComponent, {
      panelClass: 'dialog',
      data: {
        row: null,
        type: TYPES_ACTIONS_DIALOG.ADD,
        hqId: this.hqId
      }
    });
    dialogRef.afterClosed().subscribe((result: Teller) => {
      if (result) {
        const apptmIds:number[]= this.selection.selected.reduce(( p:number[], c:TAppointmentTemp)=>[...p, c.apptmId || -1], [])
        this.updateTeller(apptmIds, result.tellId || -1)
      }
    });
  }
  //select search
  selectSearch(){
    this.readAppointmentTempCRUD(this.hqId,this.selectedTeller, this.selectedCategory, this.selectedApptmState)
  }

 /* filterTeller(tellId:number):TTellerJoinPerson{
    return this.tellers.filter(t=>t.tellId==tellId)[0]
  }

  filterCategory(catId:number):Category{
    return this.categories.filter(c=>c.catId==catId)[0]
  }*/

  
  //read
  private readCategory(hqId:number) {
    this.categoryService.allByHQ(hqId).subscribe({
      next: d => this.categories = d
    })
  }

  private readTeller(hqId:number) {
    this.tellerService.getJoinPersonByHQ(hqId).subscribe({
      next: d => this.tellers = d.data  as TTellerJoinPerson[]
    })
  }

  private updateTellerCRUD() {

  }



  readAppointmentTempCRUD(hqId:number, tellId:number, catId:number, apptmState:number): boolean {
    this.isLoading = true;
    this.appointmentTempService.getAllBy(hqId,tellId, catId, apptmState).subscribe({
      next: (r) => {
        console.log("Data dentro de ticket",r)
        this.isLoading = false;
        this.dataSource.data = r.data as TAppointmentTemp[]
        this.selection.clear() 

      },
      error: () => {
        
      }
    });

    return true
  }

  private updateTeller(apptmIds:number[], tellId:number){
    this.appointmentTempService.updateTeller(apptmIds, tellId).subscribe({
      next:d=>{
        this.showMessage.success({message:d.msg})

      }, 
      error:e=>{
        this.showMessage.error({message:e.error.message,  action: ()=>this.updateTeller(apptmIds, tellId)})
      }
    })
  }

  substrNameClient=(s:string)=> GlobalHelpers.subString(s,30)
  formatDate=(date:Date)=>GlobalHelpers.formatDateAndHour(date)
  convertSecondsToHHMMSS=(...s:string[])=>{ return GlobalHelpers.convertSecondsToHHMMSS(s.reduce((a,b)=>a+parseInt(b), 0))}
}
