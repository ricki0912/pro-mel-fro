import { Component, Input, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/services/category.service';
import { Teller, TELLER_TYPES_STATE, TTellerJoinPerson } from 'src/app/interfaces/teller';
import { TellerService } from 'src/app/services/teller.service';
import { Category } from 'src/app/interfaces/category';
import { FindTellerComponent } from '../teller/pages/find-teller/find-teller.component';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentTempService } from 'src/app/services/appointment-temp.service';
import { AppointmentTemp, APPOINTMENT_STATE, TAppointmentTemp } from 'src/app/interfaces/appointment-temp';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { WaitingLineService } from 'src/app/socket/waiting-line.service';
import { SOCKET_ACTION } from 'src/app/global/parents/socket.interface';
import { MainViewService } from '../main-view/main-view.service';
import { User } from 'src/app/interfaces/user';
import { GlobalHelpers } from 'src/app/global/helpers/global.helpers';
import { FloatingWaitingLineService } from '../main-view/pages/floating-waiting-line/floating-waiting-line.service';


@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {
  TTS=TELLER_TYPES_STATE

  user:any={}
  
  isLoading: boolean = false
  /*Combo box */
  //categories: Category[] = [];
  tellers: TTellerJoinPerson[] = []
  selectedCategory: number = 0
  currentTeller:Teller={tellName:'Ninguno'}
  selectedTeller: number 



  displayedColumns: string[] = ['select', 'position','linkBuss', 'ticket', 'code_category', 'category', 'time'];
  dataSource = new MatTableDataSource<TAppointmentTemp>();
  selection = new SelectionModel<TAppointmentTemp>(true, []);
  

  constructor(
    private categoryService: CategoryService,
    private tellerService: TellerService,
    private appointmentTempService: AppointmentTempService,
    private dialog: MatDialog, 
    private showMessage:ShowMessageService,
    private tokenService: TokenStorageService,
    private waitingLineService:WaitingLineService,
    private mainViewService:MainViewService, 
    private fwlService: FloatingWaitingLineService


  ) {
    this.currentTeller=this.tokenService.getTeller() || {tellName:"Solicita que te asignen una ventanilla."}
    this.selectedTeller=this.currentTeller.tellId || -1
    
   }

  ngOnInit(): void {
    //this.readCategory();
    //this.getSocketWaitingLine()
    //this.readAppointmentTempCRUD(0,0);
    //this.selectSearch()
    //this.listenRoute(()=>this.selectSearch())
    this.getTAppointmentTemps()

    if(this.currentTeller.tellId)
      this.readTeller(this.currentTeller.tellId)
  }

 /* private listenRoute(c:(o:any)=>void){
    this.mainViewService.getParams().subscribe(params=>{
      this.hqId=parseInt(params['hqId'] || 0)
      c(this.hqId);
    })
  }*/
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
  
  substrNameClient=(s:string)=> GlobalHelpers.subString(s,15)
    

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
        hqId:this.currentTeller.hqId || -1
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
    this.fwlService.readAppointmentTempsPendingOfMyTeller({})
    //this.readAppointmentTempCRUD(this.currentTeller.hqId || -1,this.selectedTeller, this.selectedCategory, APPOINTMENT_STATE.PENDING)
    if(this.currentTeller.tellId) this.readTeller(this.currentTeller.tellId)
  }
/*
  filterTeller(tellId:number):TTellerJoinPerson{
    return this.tellers.filter(t=>t.tellId==tellId)[0]
  }*/

  /*filterCategory(catId:number):Category{
    return this.categories.filter(c=>c.catId==catId)[0]
  }*/

  
  //read
  /*private readCategory() {
    this.categoryService.all().subscribe({
      next: d => this.categories = d
    })
  }*/
/*
  private readTeller() {
    this.tellerService.getJoinPerson().subscribe({
      next: d => {
        this.tellers = d.data  as TTellerJoinPerson[]
        this.selectedTeller=this.tellers.filter(t=>t.userId==this.tokenService.getUser().user.id)[0].tellId || 0
        if(this.selectedTeller!=0)
          this.selectSearch()
      }
    })
  }*/

  private updateTellerCRUD() {

  }

  getStateName(tellState:number):string{
    if(tellState==TELLER_TYPES_STATE.ACTIVO){
      return TELLER_TYPES_STATE.ACTIVO_NAME
    }
    if(tellState==TELLER_TYPES_STATE.EN_ESPERA){
      return TELLER_TYPES_STATE.EN_ESPERA_NAME
    }
    return ''
  }
/*
  readAppointmentTempCRUD(hqId:number,tellId:number, catId:number,apptmState:number): boolean {
    this.isLoading = true;
    this.appointmentTempService.getAllBy(hqId,tellId, catId,apptmState).subscribe({
      next: (r) => {
        this.isLoading = false;
        this.dataSource.data = r.data as TAppointmentTemp[]
        this.selection.clear() 

      },
      error: () => {
        
      }
    });

    return true
  }*/

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

/*
  getSocketWaitingLine(){
    this.waitingLineService.getSocketWaitingLine(this.selectedTeller).subscribe({
      next:d=>{
        console.log("casi lo logro", d)
        const action=d.action;
        switch (action) {
          case SOCKET_ACTION.WAITING_LINE_ADD_APPOINTMENT:
            const data=d.data as AppointmentTemp
            if(this.selectedTeller==data.tellId)
              this.selectSearch()
            break;
        
          default:
            break;
        }
      }
    })
  }*/



  beforeUpdState(){
    if(this.currentTeller.tellState && this.currentTeller.tellState==TELLER_TYPES_STATE.ACTIVO){
      const tellState=TELLER_TYPES_STATE.EN_ESPERA; /*En espera*/
      this.updState(
        this.currentTeller.tellId || -1,
         tellState,
         ()=>{this.showMessage.success({message:"En espera. Puedes darte un respiro."});this.currentTeller.tellState=tellState} 
        );
    }
    if(this.currentTeller.tellState && this.currentTeller.tellState==TELLER_TYPES_STATE.EN_ESPERA){
      const tellState=TELLER_TYPES_STATE.ACTIVO;/*Activo*/
      this.updState(
        this.currentTeller.tellId || -1, 
        tellState,
        ()=>{this.showMessage.success({message:"En arranque. Listo para empezar el dia"});this.currentTeller.tellState=tellState}
      );
    }
  }
  
  private updState(id:number, tellState:number, f:()=>void){
    this.tellerService.updState(id, tellState).subscribe({
      next: d=>{
        f();
      }, 
      error:e=>{
        this.showMessage.error({message:e.error.message})
      }
    })
  }

  private readTeller(id:number){
    this.tellerService.find(id).subscribe({
      next: d=>{
        this.currentTeller=d
      }, 
      error:e=>{
        this.showMessage.error({message: e.error.message})
      }
    })
  }

  private getTAppointmentTemps(){
    this.fwlService.getTAppointmentTemps().subscribe({
      next:(d)=>{
        this.dataSource.data=d 
      },
      error:(e)=>{

      }
    })
}


}