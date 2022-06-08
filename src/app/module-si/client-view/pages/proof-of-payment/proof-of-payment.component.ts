

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';

import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { Payment } from 'src/app/interfaces/payment';
import { PaymentService } from 'src/app/services/payment.service';
import { environment } from 'src/environments/environment';
import { ClientViewService } from '../../client-view.service';
import { Bussines } from 'src/app/interfaces/bussines';



@Component({
  selector: 'app-proof-of-payment',
  templateUrl: './proof-of-payment.component.html',
  styleUrls: ['./proof-of-payment.component.scss']
})
export class ProofOfPaymentComponent implements OnInit {

  isLoading = true;
  serBuss: Bussines | undefined;

  constructor(
    private paymentService: PaymentService,
    public dialogEditUser: MatDialog,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private showMessage: ShowMessageService,
    private datepipe: DatePipe,
    private clientViewService:ClientViewService

  ) { }



  ngOnInit(): void {
    this.listenSelectedBusiness((o)=>{this.readCRUD(o.bussId || -1)})
  }
  private listenSelectedBusiness(o:(o:Bussines)=>void){
    this.clientViewService.getSelectedBussines().subscribe((b:Bussines |null)=>{
      
      if(b){
        this.serBuss=b;
        o(this.serBuss);
      }
    })
  }

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol','options'];
  dataSource = new MatTableDataSource<Payment>();

  selection = new SelectionModel<Payment>(true, []);

  clickedRows = new Set<Payment>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;


  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    //console.log(numSelected, numRows);
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
  checkboxLabel(row?: Payment): string {
    //console.log(this.selection.selected)
    if (!row) {
      //console.log(`${this.isAllSelected() ? 'deselect' : 'select'} all`);
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    } else {
      //return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
      //console.log(`${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${ row.ID}`)
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.bussId}`;
    }

  }



  /*************** PARA CARGAR LOS MODALES************ */
  /*EL modal para agregar */


 



  /*************** CRUD CON BASE DE DATOS************ */


  createCRUD(object: any): boolean {
    return false;
  }

  /*para cargar a la tabla*/
  readCRUD(bussId:number): boolean {
    this.isLoading = true;
    this.paymentService.all(bussId).subscribe({
      next: data => {

        this.dataSource.data = data.data as Payment[];
        this.isLoading = false

      },
      error: error => {
        this.isLoading = false
      }

    })
    return false;
  }
  deleteCRUD(ids: string | number | string[] | number[] | null): boolean {
    return false
  }
  updateCRUD(id: string | number | null, object: any): boolean {
    return false;
  }

  changeState(id: number[], state: number/*1=activo, 2=inactivo */) {

  }

  delete(id: number[]) {

  }
/*** */
public openPDFNewWindow(p:Payment){
  if(p.payToken)
    window.open(environment.API_URL+"/v1/payments/"+p.payToken+"/proof-of-payment");
} 
 dateFormat(d: string) {
    let t = ''
    if (d) {


      t = this.datepipe.transform(new Date(d), 'dd/MM/yyyy hh:mm:ss a') || '';
    }
    return t;
  }


  /*Crud services */
  /**Para añadir usuario  */
  


}


