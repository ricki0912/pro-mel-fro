


import { Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/interfaces/category';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentTemp, APPOINTMENT_STATE, ApptmState } from 'src/app/interfaces/appointment-temp';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { MainViewService } from '../../main-view/main-view.service';
import { Appointment } from 'src/app/interfaces/appointment';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Teller } from 'src/app/interfaces/teller';

@Component({
  selector: 'app-waiting-line',
  templateUrl: './waiting-line.component.html',
  styleUrls: ['./waiting-line.component.scss']
})

export class WaitingLineComponent implements OnInit {
  private hqId:number=0
  isLoading: boolean = false
  /*Combo box */
  categories: Category[] = [];
  tellers: Teller[] = []

  apptmStates:ApptmState[]=[
    {apptmStateId:APPOINTMENT_STATE.PENDING, apptmStateName:"Pendiente"},
    {apptmStateId:APPOINTMENT_STATE.CURRENT_ATTENTION, apptmStateName:"En atención"},
  ]

  selectedCategory: number = 0
  selectedTeller: number = 0
  selectedApptmState:number=0


  displayedColumns: string[] = ['select', 'position', 'ticket', 'apptmDateTimePrint','teller', 'category', 'time'];
  dataSource = new MatTableDataSource<Appointment>();
  selection = new SelectionModel<Appointment>(true, []);
  
  constructor(
    
    
    private appointmentService: AppointmentService,
    private dialog: MatDialog, 
    private showMessage:ShowMessageService,
    private mainViewService:MainViewService
  ) { }

  ngOnInit(): void {
    //this.listenRoute(o=>this.readCategory(o))
    //this.listenRoute(o=>this.readTeller(o))
  this.listenRoute((a)=>{})
    //this.listenRoute(o=>this.readAppointmentTempCRUD(o, this.selectedTeller,this.selectedCategory,this.selectedApptmState ))
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
  checkboxLabel(row?: Appointment): string {
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
  
  //select search
  selectSearch(){
    this.readAppointmentCRUD(this.hqId,this.selectedTeller, this.selectedCategory, this.selectedApptmState,'','')
  }

 /* filterTeller(tellId:number):TTellerJoinPerson{
    return this.tellers.filter(t=>t.tellId==tellId)[0]
  }

  filterCategory(catId:number):Category{
    return this.categories.filter(c=>c.catId==catId)[0]
  }*/

  



  readAppointmentCRUD(hqId:number,tellId:number, catId:number, apptmState:number, dateStart:string, dateEnd:string ): boolean {
    this.isLoading = true;
    this.appointmentService.getAllBy(hqId,tellId, catId, apptmState,dateStart,dateEnd).subscribe({
      next: (r) => {
        console.log("Data dentro de ticket",r)
        this.isLoading = false;
        this.dataSource.data = r.data as Appointment[]
        this.selection.clear() 

      },
      error: () => {
        
      }
    });

    return true
  }

}