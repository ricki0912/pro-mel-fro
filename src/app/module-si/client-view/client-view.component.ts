import { Location } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';

import { Bussines } from 'src/app/interfaces/bussines';



@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit, OnDestroy {

  showBusiness = true;
  showBusinessEdit = false;

  showPerson = true;
  showPersonEdit = false;

  showAfiliacion = true;
  showAfiliacionEdit = false;

  showOtros = true;
  showOtrosEdit = false;

  constructor(
    private location : Location,
    private activate : ActivatedRoute,
    private fb: FormBuilder,
    public mediaObserver: MediaObserver
  ) { }
  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

  ngOnInit(): void {
    this.activate.params.subscribe((params)=>{
      console.log("PAMRAMETROS DE CLIENT VIEW", params['bussId']);

    })
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      let mqAlias: string = String(result.mqAlias);
      this.cols = this.gridByBreakpoint[mqAlias];
    })
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

  datosBusinesForm: FormGroup = this.fb.group({
    business : this.fb.group({
      bussKind : ['',Validators.required],
      bussName : ['',Validators.required],
      bussRuc : ['',Validators.required],
      bussAddress :[''],
      bussFileKind : ['',Validators.required],
      bussFileNumber : ['',Validators.required],
      bussState : ['',Validators.required]
    })
  });

  datosPersonForm: FormGroup = this.fb.group({
    person : this.fb.group({
      perKindDoc : ['',Validators.required],
      perNumberDoc : ['',Validators.required],
      perName : ['',Validators.required],
      perTel :[''],
      perEmail : [''],
      perAddress : ['']
    })
  });

  datosAfiliacionForm: FormGroup = this.fb.group({
    afiliacion : this.fb.group({
      bussSunatUser : ['',Validators.required],
      bussSunatPass : ['',Validators.required],
      bussCodeSend : ['',Validators.required],
      bussCodeRNP : ['',Validators.required],
      bussAfpUser : ['',Validators.required],
      bussAfpPass : ['',Validators.required]
    })
  });

  datosAdicionalForm: FormGroup = this.fb.group({
    adicional : this.fb.group({
      bussDateMembership : ['',Validators.required],
      bussDateStartedAct : ['',Validators.required],
      bussRegime : ['',Validators.required],
      bussKindBookAcc : ['',Validators.required],
      bussTel : ['',Validators.required],
      bussEmail : ['',Validators.required],
      bussObservation : ['',Validators.required]
    })
  });


  showEditBusiness(){
    this.showBusiness = !this.showBusiness;
    this.showBusinessEdit = !this.showBusinessEdit;
  }

  showEditPerson(){
    this.showPerson = !this.showPerson;
    this.showPersonEdit = !this.showPersonEdit;
  }

  showEditAfiliacion(){
    this.showAfiliacion = !this.showAfiliacion;
    this.showAfiliacionEdit = !this.showAfiliacionEdit;
  }

  showEditOtros(){
    this.showOtros = !this.showOtros;
    this.showOtrosEdit = !this.showOtrosEdit;
  }

}

interface GridResponsive {
  [key: string]: number
}
