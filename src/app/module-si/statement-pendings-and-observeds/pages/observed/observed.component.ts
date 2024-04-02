import { Component, Input } from '@angular/core';
import { Bussines } from 'src/app/interfaces/bussines';

@Component({
  selector: 'app-observed',
  templateUrl: './observed.component.html',
  styleUrls: ['./observed.component.scss']
})
export class ObservedComponent {
  @Input() /*dataSource*/businessPendings:Bussines[] =[] 
  displayedColumns: string[] = ['position', 'bussName', 'bussRUC','tellCode',  'bussFileNumber', 'bussStateDate'];
 
}
