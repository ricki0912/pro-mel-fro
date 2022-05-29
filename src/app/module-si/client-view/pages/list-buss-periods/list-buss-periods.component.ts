import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Period } from 'src/app/interfaces/period';
import { Services } from 'src/app/interfaces/services';
import { ServicesProvided } from 'src/app/interfaces/services-provided';
import { ServicesProvidedService } from 'src/app/services/services-provided.service';
import { ServicesService } from 'src/app/services/services.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';

@Component({
  selector: 'app-list-buss-periods',
  templateUrl: './list-buss-periods.component.html',
  styleUrls: ['./list-buss-periods.component.scss']
})
export class ListBussPeriodsComponent implements OnInit {

  @Input() bp: Period = {};
  private services: Services[] = [];
  constructor(
    private spService: ServicesProvidedService,
    private showMessage: ShowMessageService,
    private servicesService: ServicesService
  ) { }

  ngOnInit(): void {
    this.readServices();
  }

  displayedColumns: string[] = ['select', 'service', 'period', 'amount', 'debt', 'paid', 'state', 'LimitPayment', 'comment', 'actions'];
  dataToDisplay = [...ELEMENT_DATA];

  dataSource = new MatTableDataSource<PeriodicElement>(this.dataToDisplay);
  selection = new SelectionModel<PeriodicElement>(true, []);

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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.service + 1}`;
  }

  //FUNCIONES
  addData(){
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataToDisplay = [...this.dataToDisplay, ELEMENT_DATA[randomElementIndex]];
    //this.dataSource.setData(this.dataToDisplay);
    const p: PeriodicElement={service: 1, period: 1, amount: 20.00, date: '20/02/2022', voucher:'Boleta', numVoucher:0, state:'pagado', comment:'g'};
    this.dataSource.data.push(p);
    this.dataSource.data = this.dataSource.data.slice();
  }
  removeData(){
    //this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    //this.dataSource.setData(this.dataToDisplay);
    const d = this.dataSource.data;


    /*if(d[d.length-1].name == 'Neon'){
      return
    }*/
    this.dataSource.data = this.dataSource.data.slice(0,-1);
  }

  /*Actualizar todos los datos de los servicios*/
  updSv(el: PeriodicElement, sv: sv) {
    if (sv == null) { return; }
    el.service = Number(sv.name);
    this.dataSource.data = this.dataSource.data;
  }

  updPd(el: PeriodicElement, pd: pd) {
    if (pd == null) { return; }
    el.period = Number(pd.period);
    this.dataSource.data = this.dataSource.data;
  }

  updMt(el: PeriodicElement, amount: number) {
    if (amount == null) { return; }
    el.amount = amount;
    this.dataSource.data = this.dataSource.data;
  }

  update(el: PeriodicElement, comment: string) {
    if (comment == null) { return; }
    el.comment = comment;
    this.dataSource.data = this.dataSource.data;
  }

  prepareAdd(el: PeriodicElement){
    const sp: ServicesProvided = {};
    sp.dbpId = this.bp.prdsId;
    sp.svId = el.service;
    sp.spPeriodPayment = el.period;
    sp.spCost = el.amount;
    sp.spComment = el.comment;
    this.addServices(sp);
  }

  addServices(sp: ServicesProvided): boolean{

    this.spService.addServicesProvided(sp).subscribe({
      next: data => {
        this.showMessage.success({ message: data.msg });
        const servPro = data.data as ServicesProvided[];
        //this.dataSource.data.unshift(...servPro);
        //this.paginator._changePageSize(this.paginator.pageSize);
      },
      error: error => {
        this.showMessage.error({ message: error.error.message, action: () => this.addServices(sp) })
      }
    });
    return true;
  }

  findSubPeriod(so: string){
    return this.subperiod.find(o=>o.value==so);
  }

  findServices(fs: number){
    return this.services.find(o=>o.svId==fs);
  }


  readServices(){
    this.servicesService.all()?.subscribe({
      next:d=>{
        this.services = d;
      }
    })
  }

  subperiod: SubPeriodo[] = [
    {value: '1', name: 'Enero'},
    {value: '2', name: 'Febrero'},
    {value: '3', name: 'Marzo'},
    {value: '4', name: 'Abril'},
    {value: '5', name: 'Mayo'},
    {value: '6', name: 'Junio'},
    {value: '7', name: 'Julio'},
    {value: '8', name: 'Agosto'},
    {value: '9', name: 'Setiembre'},
    {value: '10', name: 'Octubre'},
    {value: '11', name: 'Noviembre'},
    {value: '12', name: 'Diciembre'},
  ];

}

export interface PeriodicElement {
  service: number;
  period: number;
  amount: number;
  date: string;
  voucher: string;
  numVoucher: number;
  state: string;
  comment: string;
}

export interface sv {
  name : string;
}

export interface pd {
  period : string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {service: 1, period: 1, amount: 1.00, date: '27/04/2022', voucher:'boleta', numVoucher: 1, state:'pagado', comment:'h'},
  {service: 2, period: 3, amount: 4.00, date: '27/04/2022', voucher:'factura', numVoucher: 10, state:'pagado', comment:'h'},
  {service: 3, period: 5, amount: 6.97, date: '27/04/2022',voucher:'boleta', numVoucher: 12, state:'Pendiente', comment:'h'},
  {service: 4, period: 12, amount: 9.01, date: '27/04/2022', voucher:'boleta', numVoucher: 234, state:'pagado', comment:'h'},
  {service: 5, period: 8, amount: 10.81, date: '27/04/2022', voucher:'ticket', numVoucher: 3, state:'pagado', comment:'h'},
];

interface SubPeriodo {
value: string;
name: string;
}


