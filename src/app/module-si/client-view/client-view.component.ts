import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudInterface } from 'src/app/global/interfaces/crud.interface';
import { Bussines } from 'src/app/interfaces/bussines';
import { BussinesService } from 'src/app/services/bussines.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { ClientViewService } from './client-view.service';

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.scss'],
})
export class ClientViewComponent implements OnInit, OnDestroy, CrudInterface {

  isLoading = true;
  business: Bussines[]=[];
  contentBusiness = true;
  contentServices = false;


  constructor(
    private location : Location,
    private activate : ActivatedRoute,
    private businessService: BussinesService,
    private showMessage: ShowMessageService,
    private clientViewService: ClientViewService
  ) { }

  ngOnInit(): void {
    this.activate.params.subscribe((params)=>{
      this.readCRUD(params['bussId']);
    })
  }
  ngOnDestroy(): void {

  }

  showServices(){
    this.contentBusiness = !this.contentBusiness;
    this.contentServices = !this.contentServices;
  }

  createCRUD(object: any): boolean {
    throw new Error('Method not implemented.');
  }
  readCRUD(id : number[]): boolean {
    this.isLoading=true;
    this.businessService.findBusiness(id)?.subscribe({
      next: data=>{
        this.business=data
        this.isLoading=false
        this.onSelectedBussines(this.business[0])
      },
      error: e=>{
        this.showMessage.error({message: e.error.message})
      }
    })
    return true;
  }

  updateCRUD(object: any, id: string | number | null): boolean {
    throw new Error('Method not implemented.');
  }
  deleteCRUD(ids: string | number | string[] | number[] | null): boolean {
    throw new Error('Method not implemented.');
  }

  private onSelectedBussines(business:Bussines){
    this.clientViewService.onSelectedBussines(business)
  }

}


