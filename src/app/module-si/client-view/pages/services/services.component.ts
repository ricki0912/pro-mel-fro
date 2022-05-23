import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, ReplaySubject } from 'rxjs';


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  panelOpenState = false;

  constructor(  ) {  }

  ngOnInit(): void {
  }

  displayedColumns: string[] = ['select', 'service', 'period', 'amount', 'date', 'voucher', 'numVoucher', 'state', 'comment', 'actions'];
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


  addData(){
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataToDisplay = [...this.dataToDisplay, ELEMENT_DATA[randomElementIndex]];
    //this.dataSource.setData(this.dataToDisplay);
    const p: PeriodicElement={service: 'Declaracion Jurada', period: 'Enero', amount: '20.00', date: '20/02/2022', voucher:'Boleta', numVoucher:0, state:'pagado', comment:'g'};
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
    console.log(sv);
    console.log(sv.name);
    if (sv == null) { return; }
    el.service = sv.name;
    this.dataSource.data = this.dataSource.data;
  }

  updPd(el: PeriodicElement, pd: pd) {
    console.log(pd);
    console.log(pd.period);

    if (pd == null) { return; }
    el.period = pd.period;
    this.dataSource.data = this.dataSource.data;
  }

  updMt(el: PeriodicElement, amount: string) {
    if (amount == null) { return; }
    el.amount = amount;
    this.dataSource.data = this.dataSource.data;
  }

  update(el: PeriodicElement, comment: string) {
    if (comment == null) { return; }
    el.comment = comment;
    this.dataSource.data = this.dataSource.data;
  }

}

/*class ServicesDataSource extends DataSource<PeriodicElement> {
  private _dataStream = new ReplaySubject<PeriodicElement[]>();

  constructor(initialData: PeriodicElement[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<PeriodicElement[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: PeriodicElement[]) {
    this._dataStream.next(data);
  }
}*/

export interface PeriodicElement {
  service: string;
  period: string;
  amount: string;
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
  {service: '1', period: 'Hydrogen', amount: '1.00', date: '27/04/2022', voucher:'boleta', numVoucher: 1, state:'pagado', comment:'h'},
  {service: '2', period: 'Helium', amount: '4.00', date: '27/04/2022', voucher:'factura', numVoucher: 10, state:'pagado', comment:'h'},
  {service: '3', period: 'Lithium', amount: '6.97', date: '27/04/2022',voucher:'boleta', numVoucher: 12, state:'Pendiente', comment:'h'},
  {service: '4', period: 'Beryllium', amount: '9.01', date: '27/04/2022', voucher:'boleta', numVoucher: 234, state:'pagado', comment:'h'},
  {service: '5', period: 'Boron', amount: '10.81', date: '27/04/2022', voucher:'ticket', numVoucher: 3, state:'pagado', comment:'h'},
];




