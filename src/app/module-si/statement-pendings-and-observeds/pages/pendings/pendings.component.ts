import { Component, Input } from '@angular/core';
import { Bussines } from 'src/app/interfaces/bussines';

@Component({
  selector: 'app-pendings',
  templateUrl: './pendings.component.html',
  styleUrls: ['./pendings.component.scss']
})
export class PendingsComponent {
  @Input() /*dataSource*/businessPendings:Bussines[] =[] 
  displayedColumns: string[] = ['position', 'bussName', 'bussRUC','tellCode', 'bussFileNumber','bussStateDate'];
  //dataSource = ELEMENT_DATA;


}


