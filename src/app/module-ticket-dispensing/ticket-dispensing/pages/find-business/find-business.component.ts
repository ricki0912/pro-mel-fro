

import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout'

//import {Observable} from "rxjs/Observable";

import {  Subscription } from 'rxjs';

import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';

import { Bussines } from 'src/app/interfaces/bussines';
import { BussinesService } from 'src/app/services/bussines.service';
import { KeyboardService } from '../keyboard/keyboard.service';
import { TicketDispensingService } from '../../ticket-dispensing.service';
import { HeadService } from '../head/head.service';


@Component({
  selector: 'app-find-business',
  templateUrl: './find-business.component.html',
  styleUrls: ['./find-business.component.scss']
})
export class FindBusinessComponent implements OnInit, OnDestroy {
  isLoading:boolean=false;

  businessSelected?:Bussines;
  business:Bussines[]=[]
  businesFiltered:Bussines[]=[]
  wordFiltered:string=""
  messageNotFound:string=""

  setBusinessSelected(businessSelected:Bussines){
    this.businessSelected=businessSelected
  }

  filter(value:string){
    //this.messageNotFound="Si no logras ubicar tu RUC, te sugerimos regresar y seleccionar uno de nuestros servicios de consulta."
    this.wordFiltered=value
    this.businessSelected=undefined
    if(!this.wordFiltered){
      return
    }
    let regex= new RegExp('.*'+value+'.*')
    this.businesFiltered=this.business.filter(e=>regex.test((e.bussName || '').toLowerCase()))
    console.log(this.businesFiltered, this.business)
  }

  cols: number = 2;

  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }

  mediaSub!: Subscription;

  title = "Encuentra tú RUC"
  
  constructor(
    public mediaObserver: MediaObserver,
    private businessService: BussinesService,
    private showMessage: ShowMessageService,
    private _keyboardService:KeyboardService,
    private _ticketDispensingService:TicketDispensingService,
    private _headService:HeadService

  ) { }

  ngOnInit(): void {
    this.renderScreen()
    this.readCRUDBusiness()
    this._headService.setMessage("Ingrese parte del nombre o razón social")
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

  renderScreen = (): void => {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      let mqAlias: string = String(result.mqAlias);
      this.cols = this.gridByBreakpoint[mqAlias];
    })
  }

  onReturn = (business: Bussines): void => {
    if(business.bussRUC){
      this._keyboardService.setValue(business.bussRUC)
      this._ticketDispensingService.comeBack()
    }
  };

  goHome(){
    this._ticketDispensingService.goHome()
  }

  ok() {
    const t=this.businessSelected;
    if(t)
      this.onReturn(t);
  }
  
  private readCRUDBusiness(){
    this.isLoading=true;
    this.businessService.allSummarized()?.subscribe({
      next:data=>{
        this.isLoading=false;
        this.business=data
        //this.businesFiltered=data
      }, 
      error:error=>{
        this.isLoading=false;
        this.showMessage.error({message:error.error.message})
      }
    });
  }
  onEdit(event:any, item:Bussines){

  }
}

interface GridResponsive {
  [key: string]: number
}


