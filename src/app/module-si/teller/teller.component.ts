
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudInterface } from 'src/app/global/interfaces/crud.interface';
import { ActionDialogInterface, TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { Teller } from 'src/app/interfaces/teller';
import { EditComponent } from './pages/edit/edit.component';
import { TellerService } from 'src/app/services/teller.service';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';

//dialogo
//import { EditComponent } from './edit/edit.component';


@Component({
  selector: 'app-teller',
  templateUrl: './teller.component.html',
  styleUrls: ['./teller.component.scss']
})
export class TellerComponent implements OnInit, AfterViewInit, ActionDialogInterface, CrudInterface {
  isLoading=true;

  tellers: Teller[]=[];

  ngAfterViewInit() {
  }

  constructor(
    public dialogEditUser: MatDialog,
    private tellerService: TellerService,
    private loadingService: LoadingService,
    private showMessage: ShowMessageService
    ) {

  }

  ngOnInit(): void {
    this.readCRUD()
  }

  /*OPEN MODAL  */
  openDialogAdd(): boolean {
    const dialogRef = this.dialogEditUser.open(EditComponent, {
      panelClass: 'dialog',
      data: {
        row: null,
        type: TYPES_ACTIONS_DIALOG.ADD
      }
    });
    dialogRef.afterClosed().subscribe((result:Teller) => {
      if(result){
        this.createCRUD(result)
      }
    });
    return false;
  }

  openDialogUpd(data: Teller): boolean {
    const dialogRef = this.dialogEditUser.open(EditComponent, {
      panelClass: 'dialog',
      data: {
        row: data,
        type: TYPES_ACTIONS_DIALOG.UPD
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.updateCRUD(result);
      }
    });
    return false;
  }
  openDialogdAddAndUpd(object: any): boolean {

    return false;
  }

  /*Crud service */
  createCRUD(object: Teller): boolean {
    this.tellerService.add(object).subscribe({
      next: data=>{
        this.readCRUD()
        this.showMessage.success({message: data.msg})
      },
      error: error=>{
        this.showMessage.error({message: error.error.message, action:()=>this.createCRUD(object)})
      }
    })

    return true;
  }

  updateCRUD(object: Teller ): boolean {
    this.tellerService.upd(object).subscribe({
      next: data=>{
        this.showMessage.success({message: data.msg})
        this.readCRUD()
      },
      error: error=>{
        this.showMessage.error({message: error.error.message, action:()=>this.updateCRUD(object)})
      }
    })

    return true;
  }

  readCRUD(): boolean {
    this.isLoading=true;
    this.tellerService.all().subscribe({
      complete: () => { },
      next: (r: Teller[]) => {
        this.isLoading=false;
        this.tellers=r
      },
      error: () => {

      }
    });

    return true
  }
  beforeDelete(id:number){
    this.wantDelete(()=>this.deleteCRUD(id))
  }
  wantDelete(d:()=>void){
    this.dialogEditUser
      .open(DialogConfirmationComponent, {
        data: `Esta seguro que desea eliminar.`,
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          d();
        } else {

        }
      });
  }
  deleteCRUD(id: number): boolean {
    this.tellerService.del(id).subscribe({
      next: data=>{
        this.showMessage.success({message: data.msg});
        this.readCRUD();
      },
      error: error=>{
        this.showMessage.error({message: error.error.message})
      }
    })
    return true;
  }

}
