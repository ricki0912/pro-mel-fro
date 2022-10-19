import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BussinesService } from 'src/app/services/bussines.service';
import { InterfaceParamsResponse } from 'src/app/global/parents/parent.interface';
import { Bussines } from 'src/app/interfaces/bussines';

@Component({
  selector: 'app-search-client',
  templateUrl: './search-client.component.html',
  styleUrls: ['./search-client.component.scss']
})
export class SearchClientComponent implements OnInit {
  value = '';
  stateCtrl = new FormControl();
  bussines:Bussines[]=[];
  bussinesObs:Observable<Bussines[]>;

  constructor(
    private bussinesService:BussinesService
  ) { 
    this.bussinesObs=this.stateCtrl.valueChanges
  }
  ngOnInit(): void {

    this.readBussines();

    this.bussinesObs = this.stateCtrl.valueChanges
    .pipe(
      startWith(''),
      map(value => value ? this._filterStates(value) : [])
    );
  }

  private _filterStates(value: string): Bussines[] {
    const filterValue = value.toLowerCase();
    return this.bussines.filter(d => d.bussName?.toLowerCase().includes(filterValue) || d.bussRUC?.includes(filterValue) || String(d.bussFileNumber)?.includes(filterValue));
  }

  private readBussines(){
    this.bussinesService.allSummarized()?.subscribe({
      next: d=>this.bussines=d as Bussines[]
    });
  }
  public navigatelClient(event:any, bussId:number){
    console.log("Navegar a bussines a "+bussId)
  }
}
