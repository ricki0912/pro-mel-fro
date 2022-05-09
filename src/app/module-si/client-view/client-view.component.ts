import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrudInterface } from 'src/app/global/interfaces/crud.interface';
import { Bussines } from 'src/app/interfaces/bussines';
import { BussinesService } from 'src/app/services/bussines.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss']
})
export class ClientViewComponent implements OnInit, OnDestroy, CrudInterface {

  isLoading = true;
  business: Bussines[]=[];

  constructor(
    private location : Location,
    private activate : ActivatedRoute,
    private businessService: BussinesService,
    private showMessage: ShowMessageService
  ) { }

  ngOnInit(): void {
    this.activate.params.subscribe((params)=>{
      console.log("PAMRAMETROS DE CLIENT VIEW", params['bussId']);
    })
    this.readCRUD();
  }
  ngOnDestroy(): void {

  }

  createCRUD(object: any): boolean {
    throw new Error('Method not implemented.');
  }
  readCRUD(): boolean {
    this.isLoading=true;
    this.businessService.all()?.subscribe({
      next: d=>{
        this.business=d
        this.isLoading=false
      },
      error: e=>{
        this.showMessage.error({message: e.error.message})
      }
    })
    console.log("yo en client view"+this.business);
    return true;
  }
  updateCRUD(object: any, id: string | number | null): boolean {
    throw new Error('Method not implemented.');
  }
  deleteCRUD(ids: string | number | string[] | number[] | null): boolean {
    throw new Error('Method not implemented.');
  }

}


