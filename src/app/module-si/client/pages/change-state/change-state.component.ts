import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-change-state',
  templateUrl: './change-state.component.html',
  styleUrls: ['./change-state.component.scss']
})
export class ChangeStateComponent implements OnInit {

  private  _todayDate=new Date()
  maxDate=new Date()
  minDate= new Date(this._todayDate.getFullYear()-10, 0,1)
  title = "Seleccionar Estado";
  date = new FormControl(new Date());

  constructor(
    private dialogRef: MatDialogRef<ChangeStateComponent>, 
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: BusinessState, type: number },
    public dialog: MatDialog,


  ) { }

  ngOnInit(): void {
    this.setTypeDialog();

  }

  setTypeDialog() {

    /**verificamos que sera actualizar, de sera asi, mostramos los datos del usuario en cada campo */
    if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
      if(this.paramsDialog.row.bussStateDate){
        this.date.setValue(this.paramsDialog.row.bussStateDate)
        this.minDate=this.paramsDialog.row.bussStateDate
      }
        
      

      if(this.paramsDialog.row.bussState)
        this.selectRadio=this.paramsDialog.row.bussState
      /*this.cardsBeforeUpd = this.paramsDialog.row;
      this.title = this.cardsBeforeUpd.cardName || ''

      this.cardsForm.get('cardName')?.setValue(this.cardsBeforeUpd.cardName)
      this.cardsForm.get('cardPhrases')?.setValue(this.cardsBeforeUpd.cardPhrases)
      this.cardsForm.get('cardState')?.setValue(this.cardsBeforeUpd.cardState?.trim())*/
    }
  }
  selectRadio: number = 0;
  states: state[] = [
    {name: 'Activo', value: 1},
    {name: 'Suspendido', value: 2},
    {name: 'Retirado', value: 3},
  ];

  onReturn = (bs: BusinessState): void => this.dialogRef.close(bs);



  beforeOK() {
    this.wantSave(() => this.ok());
  }

  wantSave(d: () => void) {
    

    this.dialog
      .open(DialogConfirmationComponent, {
        data: `¿Confirma que los datos ingresados son correctos?.`,
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          d();
        } else {
        }
      });
  }


  ok() {
    const bs: BusinessState={bussState:this.selectRadio, bussStateDate:this.date.value};
    //const t=this.selectRadio;
    //console.log(t);

    if(bs.bussState &&  bs.bussStateDate){
      this.onReturn(bs);
    }
  }

}

export interface state {
  name: string;
  value: number;
}

export interface BusinessState{
  bussState:number,
  bussStateDate:Date
}
