import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Bussines, TellerJoinUsers } from 'src/app/interfaces/bussines';
import { TELLER_TYPES_STATE } from 'src/app/interfaces/teller';
import { BussinesService } from 'src/app/services/bussines.service';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';

@Component({
  selector: 'app-assign-teller',
  templateUrl: './assign-teller.component.html',
  styleUrls: ['./assign-teller.component.scss']
})
export class AssignTellerComponent implements OnInit, OnDestroy {

  isLoading:boolean=false;
  title = "Seleccionar Ventanilla"

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'symbols'];
  tellerSelected?:TellerJoinUsers;
  dataSource = new MatTableDataSource<TellerJoinUsers>();

  constructor(
    private bussinesService: BussinesService,
    private showMessage: ShowMessageService,
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: Bussines, type: Number, hqId:number},
    private dialogRef: MatDialogRef<AssignTellerComponent>,
    private dialog: MatDialog,
    public mediaObserver: MediaObserver
  ) { }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

  ngOnInit(): void {
    this.renderScreen();
    this.readTellerWhitBusiness(this.paramsDialog.hqId);
  }

  cols: number = 1;

  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }

  mediaSub!: Subscription;

  renderScreen = (): void => {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      let mqAlias: string = String(result.mqAlias);
      this.cols = this.gridByBreakpoint[mqAlias];
    })
  }

  readTellerWhitBusiness(hqId:number){
    this.isLoading=true;
    this.bussinesService.getTellerJoinUsers(hqId).subscribe({
      next:data=>{
        this.isLoading=false;
        this.dataSource.data=data.data as TellerJoinUsers[]
      },
      error:error=>{
        this.isLoading=false;
        this.showMessage.error({message:error.error.message})
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  setTellerSelected(tellerSelected:TellerJoinUsers){
    this.tellerSelected=tellerSelected;
    //console.log(this.tellerSelected);
  }

  onReturn = (teller: TellerJoinUsers): void => this.dialogRef.close(teller);

  ok() {
    const t=this.tellerSelected;
    //console.log(t);

    if(t){
      if(t==TELLER_TYPES_STATE.ACTIVO)
        this.openDialogConfirmation(()=>this.onReturn(t))
      else
        this.onReturn(t);
    }
  }

  openDialogConfirmation(d:()=>void){
    this.dialog.open(DialogConfirmationComponent, {
      data: `Esta ventanilla esta inactiva, ¿Está seguro que desea Asignar aquí?.`,
    })
    .afterClosed()
    .subscribe((confirmado: Boolean) => {
      if (confirmado) {
        d();
      } else {

      }
    });
  }

}



interface GridResponsive {
  [key: string]: number
}
