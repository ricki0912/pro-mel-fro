import { Component } from '@angular/core';
import { AnnualResumeDetails } from 'src/app/interfaces/annual-resume-details';
@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.scss'],
})
export class TableEditComponent {
  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource: AnnualResumeDetails[] = USER_DATA;
  columnsSchema: any = COLUMNS_SCHEMA;
  constructor() {
    const aux = [];
    for (let i = 1; i <= 14; i++) {
      aux.push({
        ardMonth: i,
        ardTaxBase: undefined,
        ardTax: undefined,
        ardTotal: 0.01,
        ardPlame: undefined,
        ardFee: undefined,
      });
    }
    this.dataSource = aux;
  }

  findMonth = (id: number) => MONTHS.find((e) => e.id == id);
}

const MONTHS: Month[] = [
  { id: 1, name: 'ENERO' },
  { id: 2, name: 'FEBRERO' },
  { id: 3, name: 'MARZO' },
  { id: 4, name: 'ABRIL' },
  { id: 5, name: 'MAYO' },
  { id: 6, name: 'JUNIO' },
  { id: 7, name: 'JULIO' },
  { id: 8, name: 'AGOSTO' },
  { id: 9, name: 'SETIEMBRE' },
  { id: 10, name: 'OCTUBRE' },
  { id: 11, name: 'NOVIEMBRE' },
  { id: 12, name: 'DICIEMBRE' },
  { id: 13, name: 'TOTAL' },
  { id: 14, name: 'BALANCE ANUAL' },
];
interface Month {
  id: number;
  name: string;
}

const USER_DATA: AnnualResumeDetails[] = [
  {
    ardMonth: 1,
    ardTaxBase: 5000,
    ardTax: 18.0,
    ardTotal: 100,
    ardPlame: 5,
    ardFee: 20.0,
  },
];

const COLUMNS_SCHEMA = [
  {
    key: 'ardMonth',
    type: 'isMonth',
    label: 'Meses',
  },
  {
    key: 'ardTaxBase',
    type: 'number',
    label: 'Base Imponible',
  },
  {
    key: 'ardTax',
    type: 'number',
    label: 'I.G.V',
  },
  {
    key: 'ardTotal',
    type: 'number',
    label: 'Total',
  },
  {
    key: 'ardPlame',
    type: 'number',
    label: 'Plame',
  },
  {
    key: 'ardFee',
    type: 'number',
    label: 'Honorarios',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];
