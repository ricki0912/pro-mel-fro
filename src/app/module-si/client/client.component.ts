import { Component, OnInit, ViewChild } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

import { CrudInterface } from 'src/app/global/interfaces/crud.interface';
import { BussinesService } from 'src/app/services/bussines.service';
import { Bussines, TellerJoinUsers } from 'src/app/interfaces/bussines';

import { MatDialog } from '@angular/material/dialog';
import { EditClientComponent } from './pages/edit-client/edit-client.component';
import { ActionDialogInterface, TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MainViewService } from '../main-view/main-view.service';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})

export class ClientComponent implements OnInit, CrudInterface, ActionDialogInterface{
  private hqId:number=0
  selectedTeller: number = 0

  isLoading = true;
  tellers: TellerJoinUsers[] = [];

  constructor(
    private bussinesService: BussinesService,
    public dialogEditClient: MatDialog,
    private showMessage: ShowMessageService,
    private router: Router,
    private mainViewService:MainViewService
  ) { }

  ngOnInit(): void {
    this.readCRUD();
    this.listenRoute(o=>{})
    this.readTeller(this.hqId);

  }

  private listenRoute(c:(o:any)=>void){
    this.mainViewService.getParams().subscribe(p=>{
      this.hqId=parseInt(p['hqId'] || 0)
      c(this.hqId)
    })
  }

  displayedColumns: string[] = ['select','nombres', 'ruc', 'numArchivador', 'representate', 'dni'];
  dataSource = new MatTableDataSource<Bussines>();
  selection = new SelectionModel<Bussines>(true, []);

  clickedRows = new Set<Bussines>();


  //para el paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
      next: d => this.tellers = d.data  as TellerJoinUsers[]
    })
  }

  selectSearchBussTell(){
    this.readBusinessJoinTeller(this.selectedTeller);
  }

  readBusinessJoinTeller(tellId:number): boolean {
    this.isLoading = true;
    this.bussinesService.getBusinessJoinTeller(tellId).subscribe({
      next: (r) => {
        //console.log("Data dentro de ticket",r)
        this.isLoading = false;
        this.dataSource.data = r.data as Bussines[];
        this.selection.clear();

      },
      error: () => {

      }
    });

    return true
  }
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


