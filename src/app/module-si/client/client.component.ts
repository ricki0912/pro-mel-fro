import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

import { CrudInterface } from 'src/app/global/interfaces/crud.interface';
import { BussinesService } from 'src/app/services/bussines.service';
import { Bussines, BUSSINES_STATE, TellerJoinUsers } from 'src/app/interfaces/bussines';

import { MatDialog } from '@angular/material/dialog';
import { EditClientComponent } from './pages/edit-client/edit-client.component';
import { ActionDialogInterface, TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { MainViewService } from '../main-view/main-view.service';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { Teller } from 'src/app/interfaces/teller';
import { FindTellerComponent } from '../teller/pages/find-teller/find-teller.component';
import { AssignTellerComponent } from './pages/assign-teller/assign-teller.component';
import { BusinessState, ChangeStateComponent } from './pages/change-state/change-state.component';
import { FormControl } from '@angular/forms';
import { FileNumberComponent } from './pages/file-number/file-number.component';
import { MatSort , Sort} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Workbook } from 'exceljs';

import * as fs from 'file-saver';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})

export class ClientComponent implements OnInit, CrudInterface, ActionDialogInterface{
  /* Params para buscar*/
  ti: number = 0
  bs:number = 0;
  q:string=''
  ln:number=-1
  
  /*Params sede */
  private hqId:number=0
  

  /*array numeros */

  isLoading = true;
  tellers: TellerJoinUsers[] = [];
  teller?:Teller;

  BS=BUSSINES_STATE

  private clientTeller = new Map<number, string>();

  constructor(
    private bussinesService: BussinesService,
    private tokenService: TokenStorageService,
    public dialogEditClient: MatDialog,
    private showMessage: ShowMessageService,
    private router: Router,
    private mainViewService:MainViewService, 
    private route: ActivatedRoute,
    private _liveAnnouncer: LiveAnnouncer
  ) {
    this.ti= this.tokenService.getTeller()?.tellId || -1;
  }

  ngOnInit(): void {
    //this.readCRUD();
    //this.selectSearchBussTell();
    this.listenRoute(o=>{});
    this.readTeller(this.hqId);
    this.onListenParams()
  }

  private listenRoute(c:(o:any)=>void){
    this.mainViewService.getParams().subscribe(p=>{
      this.hqId=parseInt(p['hqId'] || 0)
      c(this.hqId)
    })

  }

  private onListenParams=() => this.route.queryParamMap.subscribe((params:any) => {
    let st=0,bs=0,q=''
    if(params.params.ti){
      this.ti=parseInt(params.params.ti)
    }
    
    if(params.params.bs){
      this.bs=parseInt(params.params.bs)
    }

    if(params.params.ln){
      this.ln=params.params.ln as number
    }


    if(params.params.q){
      this.q=params.params.q as string
    }


    this.selectSearchBussTell()
  }); // output: 

  public setListenParams=() => this.router.navigate([], { queryParams: {ti:this.ti, bs:this.bs,q:this.q, ln:this.ln}, queryParamsHandling: 'merge' });  


  displayedColumns: string[] = ['select','nombres', 'ruc', 'numArchivador', 'representate', 'dni', 'teller'];
  dataSource = new MatTableDataSource<Bussines>();
  selection = new SelectionModel<Bussines>(true, []);

  clickedRows = new Set<Bussines>();


  //para el paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

   /** Announce the change in sort state for assistive technology. */
   announceSortChange(sortState: any) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  getClientTeller(id:number){
    return this.clientTeller.get(id)
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
  checkboxLabel(row?: Bussines): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.bussId}`;
  }

  //CRUD
  createCRUD(object: any): boolean {
    throw new Error('Method not implemented.');
  }

  readCRUD(): boolean {
    this.isLoading = true;
    this.bussinesService.all()?.subscribe({
      next: data => {
        this.dataSource.data = data;
        this.isLoading = false
      },
      error: error => {
        this.isLoading = false
      }
    })
    return false;
  }

  updateCRUD(object: any, id: string | number | null): boolean {
    throw new Error('Method not implemented.');
  }
  deleteCRUD(ids: string | number | string[] | number[] | null): boolean {
    throw new Error('Method not implemented.');
  }

  openDialogAdd(): boolean {
    const dialogRef = this.dialogEditClient.open(EditClientComponent, {
      panelClass: 'dialog',
      data: {
        row: {},
        type: TYPES_ACTIONS_DIALOG.ADD,
        idSede: this.hqId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addBusinessWithPerson(result);
      }
    });
    return true
  }
  openDialogUpd(object: any): boolean {
    throw new Error('Method not implemented.');
  }
  openDialogdAddAndUpd(object: any): boolean {
    throw new Error('Method not implemented.');
  }

  //FUNCIONES
  addBusinessWithPerson(business: Bussines): boolean {
    this.bussinesService.addBusinessWithPerson(business).subscribe({
      next: data => {
        /**mostramos un mensaje de exito */
        this.showMessage.success({ message: data.msg });
        /*obtenemos el ultimo business devuelto por el backend y que viene en data */
        const business = data.data as Bussines[];

        /*El nuevo usuario lo añadimos a la primera fila de la tabla */
        this.dataSource.data.unshift(...business)
        /**actualizamops paginator */
        this.paginator._changePageSize(this.paginator.pageSize)
      },
      error: error => {
        /**Mostramos un mensaje de error y pasamos una funcion para reintenar nuevamente añdir el usuario  */
        this.showMessage.error({ message: error.error.message, action: () => this.addBusinessWithPerson(business) })
      }
    });
    return true;
  }

  loadClientsView(o: Bussines){
    this.router.navigate([`si/${this.hqId}/clients/${o.bussId}`])
  }

  private readTeller(hqId:number) {
    this.bussinesService.getTellerJoinUsers(hqId).subscribe({
      next: (d) => {
        this.tellers = d.data  as TellerJoinUsers[];
        this.clientTeller.clear();
        this.tellers.forEach(element => {
          this.clientTeller.set(element.tellId || -1, element.tellCode || "");
        });

      }
    })
  }

  selectSearchBussTell(){
    this.readBusinessJoinTeller(this.ti,this.bs, this.ln,this.q);
  }

  readBusinessJoinTeller(tellId:number, bussState:number, lastDigit:number,q:string): boolean {
    this.isLoading = true;
    this.bussinesService.getBusinessJoinTeller(tellId, bussState, lastDigit, q).subscribe({
      next: (r) => {
        //console.log("Data dentro de ticket",r)
        this.isLoading = false;
        this.dataSource.data = r.data as Bussines[];
        this.selection.clear();
      },
      error: () => {
      }
    });
    return true;
  }

  openDialogSetTeller(){
    const dialogRef = this.dialogEditClient.open(AssignTellerComponent, {
      panelClass: 'dialog',
      data: {
        row: null,
        type: TYPES_ACTIONS_DIALOG.ADD,
        hqId: this.hqId
      }
    });
    dialogRef.afterClosed().subscribe((result: TellerJoinUsers) => {
      if (result) {
        const bussIds:number[]= this.selection.selected.reduce(( p:number[], c:Bussines)=>[...p, c.bussId || -1], [])
        this.updateBusinessTeller(bussIds, result.tellId || -1)
      }
    });
  }

  private updateBusinessTeller(bussIds:number[], tellId:number){
    this.bussinesService.updateBusinessTellId(bussIds, tellId).subscribe({
      next:d=>{
        this.showMessage.success({message:d.msg});
        this.ngOnInit();
        this.selection.clear();
      },
      error:e=>{
        this.showMessage.error({message:e.error.message,  action: ()=>this.updateBusinessTeller(bussIds, tellId)})
      }
    })
  }

  openDialogChangeState(){
    const dialogRef = this.dialogEditClient.open(ChangeStateComponent, {
      panelClass: 'dialog',
      data: {
        row: null
      }
    });
    dialogRef.afterClosed().subscribe((result: BusinessState) => {
      if (result.bussState && result.bussStateDate) {
        const bussIds:number[]= this.selection.selected.reduce(( p:number[], c:Bussines)=>[...p, c.bussId || -1], [])
        this.updateBusinessState(bussIds, result.bussState, result.bussStateDate)
      }
    });

    
  }

  openDialogFileNumber(){
    const dialogRef = this.dialogEditClient.open(FileNumberComponent, {
      panelClass: 'dialog',
      data: {
        row: null
      }
    });
    dialogRef.afterClosed().subscribe((result: BusinessState) => {
      /*if (result.bussState && result.bussStateDate) {
        const bussIds:number[]= this.selection.selected.reduce(( p:number[], c:Bussines)=>[...p, c.bussId || -1], [])
        this.updateBusinessState(bussIds, result.bussState, result.bussStateDate)
      }*/
    });
  }

  private updateBusinessState(bussIds:number[], bussState:number, bussStateDate:Date){
    this.bussinesService.updBusinessState(bussIds, bussState, bussStateDate).subscribe({
      next:d=>{
        this.showMessage.success({message:d.msg});
        this.ngOnInit();
        this.selection.clear();
      },
      error:e=>{
        this.showMessage.error({message:e.error.message,  action: ()=>this.updateBusinessState(bussIds, bussState, bussStateDate)})
      }
    })
  }

  private getNameBussState(bussState:number){
    let n='';


      switch (bussState) {
          case BUSSINES_STATE.ENABLE:
            n="Activo"
          break;
          case BUSSINES_STATE.RETIRED:
              n="Retirado"
              break;
          case BUSSINES_STATE.SUSPENDED:
              n="Suspendido"
              break;
          default:
              n=""
              break;
      }
      return n;

  }

  exportExcel(){
  
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Clientes - Filtro");
  
    //CONVIRTIENDO NUESTRO ARREGLO A UN FORMATO LEGIBLE PARA EXCEL USANDO EXCELJS
    worksheet.addRow(undefined);
    for (let x1 of this.dataSource.data){
        let x2=Object.keys(x1);
  
  
        
  
        let temp=[]
        temp.push(x1.bussFileNumber)
        temp.push(x1.bussRUC)
        temp.push(x1.bussName)
        temp.push(x1.bussTel)

        temp.push((x1.bussState)?this.getNameBussState(parseInt(x1.bussState)):null)
        temp.push(x1.bussStateDate)

        temp.push(x1.person.perName)
        temp.push(x1.person.perNumberDoc)
        temp.push(x1.person.perEmail)
        

        temp.push((x1.tellId)?this.getClientTeller(x1.tellId):null)        
        temp.push((x1.tellId)?this.findNameTeller(x1.tellId)?.tellName:null)
        

        //temp.push(x1.person.perTel)
        //temp.push(x1.person.perTel2)
        //temp.push(x1.person.perTel3)
        
        /*temp.push(this.getNameBussState(parseInt(x1.bussState)))
        temp.push((x1.tellId)?this.findNameTeller(x1.tellId)?.tellName:null)
        temp.push((x1.prdsId)?this.findNamePeriod(x1.prdsId)?.prdsNameShort:null)
        temp.push((x1.svId)?this.findNameService(x1.svId)?.svName:null)
        temp.push((x1.ppayId)?this.findNamePeriodPayment(x1.ppayId)?.ppayName:null)
        temp.push(x1.spCost)
        temp.push(x1.spPaid)
        temp.push(x1.spDebt)*/
  
        /*for(let y of x1.){
          temp.push(y)
        }*/
        worksheet.addRow(temp)
    }
    //NOMBRE DEL ARCHIVO RESULTANTE
    let temp=[]
     
    let fname="Clientes - Filtro";
    let keyCol=1
    //ASIGNACIÓN DE LA CABECERA DEL DOCUMENTO EXCEL DONDE CADA CAMPO DE LOS DATOS QUE EXPORTAREMOS SERA UNA COLUMNA
    worksheet.columns = [
        { header: 'ARCHIVADOR', key: 'col'+(keyCol++), width: 10},
        { header: 'RUC', key: 'col'+(keyCol++), width: 30},
        { header: 'NOMBRE', key: 'col'+(keyCol++), width: 15},
        { header: 'TELÉFONO CORPORATIVO', key: 'col'+(keyCol++), width: 15},

        { header: 'ESTADO CLIENTE', key: 'col'+(keyCol++), width: 15},
        { header: 'CAMBIO DE ESTADO', key: 'col'+(keyCol++), width: 15},


        { header: '[PERSONA] NOMBRE', key: 'col'+(keyCol++), width: 15},
        { header: '[PERSONA] NRO DOCUMENTO', key: 'col'+(keyCol++), width: 15},
        { header: '[PERSONA] EMAIL', key: 'col'+(keyCol++), width: 15},

        { header: '[VENTANILLA] CÓDIGO', key: 'col'+(keyCol++), width: 15},
        { header: '[VENTANILLA] NOMBRE', key: 'col'+(keyCol++), width: 15},
        

        
        /*{ header: 'VENTANILLA ['+((this.t)?(this.findNameTeller(this.t)?.tellName):'Todos')+']', key: 'col'+(keyCol++), width: 20},
        { header: 'PERIODO ['+((this.p)?this.findNamePeriod(this.p)?.prdsNameShort:'Todos')+']', key: 'col'+(keyCol++), width: 20},
        { header: 'SERVICIO ['+((this.s)?this.findNameService(this.s)?.svName:'Todos')+']', key: 'col'+(keyCol++), width: 50},
        { header: 'MES/SUBPERIODO ['+((this.pp)?this.findNamePeriodPayment(this.pp)?.ppayName:'Todos')+']', key: 'col'+(keyCol++), width: 20},
        
        { header: 'COSTO', key: 'col'+(keyCol++), width: 20},
        { header: 'PAGADO', key: 'col'+(keyCol++), width: 20},
        { header: 'DEUDA', key: 'col'+(keyCol++), width: 20}*/
    ]as any;
  
    //PREPACION DEL ARCHIVO Y SU DESCARGA
    workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        fs.saveAs(blob, fname+'.xlsx');
    });
  
  }
  

  findNameTeller=(tellId:number)=>this.tellers.find(e=>e.tellId==tellId)
}

/*interface Animal {
  name: string;
  sound: string;
}*/

/*export interface PeriodicElement {
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


