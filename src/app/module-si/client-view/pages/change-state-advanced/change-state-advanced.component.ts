import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { BusinessState } from 'src/app/interfaces/business-state';
import { BussinesService } from 'src/app/services/bussines.service';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';


@Component({
  selector: 'app-change-state-advanced',
  templateUrl: './change-state-advanced.component.html',
  styleUrls: ['./change-state-advanced.component.scss']
})
export class ChangeStateAdvancedComponent {
  
  displayedColumns: string[] = ['position', 'name', 'weight'];
  businessStates:any[] = [];

  dataSource = [];



  private  _todayDate=new Date()
  maxDate=new Date()
  minDate= new Date(this._todayDate.getFullYear()-10, 0,1)
  title = "Actualización de Estado Avanzado";
  date = new FormControl(new Date());

  constructor(
    private dialogRef: MatDialogRef<ChangeStateAdvancedComponent>, 
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: BusinessState, type: number },
    public dialog: MatDialog,
    public bussinesService: BussinesService

  ) { }

  ngOnInit(): void {
    //this.setTypeDialog();
    this.beforeAllStates(this.paramsDialog.row.bussId)

  }

  setTypeDialog() {

    /**verificamos que sera actualizar, de sera asi, mostramos los datos del usuario en cada campo */
/*    if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
      if(this.paramsDialog.row.bussStateDate){
        this.date.setValue(this.paramsDialog.row.bussStateDate)
        this.minDate=this.paramsDialog.row.bussStateDate
      }
        
      

      if(this.paramsDialog.row.bussState)
        this.selectRadio=this.paramsDialog.row.bussState

    }*/
  }
  selectRadio: number = 0;
  states: state[] = [
    {name: 'Activo', value: 1},
    {name: 'Suspendido', value: 2},
    {name: 'Retirado', value: 3},
  ];


  finState =(value:number)=>  this.states.find(item => item.value == value);
 

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
    //const bs: BusinessState={bussState:this.selectRadio, bussStateDate:this.date.value};
    //const t=this.selectRadio;
    //console.log(t);

    /*if(bs.bussState &&  bs.bussStateDate){
      this.onReturn(bs);
    }*/
  }


  private beforeAllStates=(bussId?:number )=>{
    if(bussId){

      this.allStates(bussId);
    }

  }

  private allStates(bussId:number){
    this.bussinesService.allStates(bussId).subscribe({
      next: data=>{
        console.log(data); 
        this.businessStates=data.data.states;
      }, 
      error: e=>{

      }


    })
  }



}

export interface state {
  name: string;
  value: number;
}

/*
export interface BusinessState{
  bussId:number
  bussState:number,
  bussStateDate:Date
}*/



/*
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];*/


