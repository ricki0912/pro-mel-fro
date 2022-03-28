

import { Component, OnInit } from '@angular/core';
import { CrudInterface } from 'src/app/global/interfaces/crud.interface'
import { CategoryService } from 'src/app/services/category.service';
import { Category, CategoryTree, CATEGORY_TYPES_AUTH } from 'src/app/interfaces/category'
import { CategoryHelpers } from 'src/app/global/helpers/category.helpers'
import { ThisReceiver } from '@angular/compiler';
import { AppointmentTempService } from 'src/app/services/appointment-temp.service';
import { AppointmentTemp } from 'src/app/interfaces/appointment-temp';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';

@Component({
  selector: 'app-ticket-dispensing',
  templateUrl: './ticket-dispensing.component.html',
  styleUrls: ['./ticket-dispensing.component.scss']
})
export class TicketDispensingComponent implements OnInit, CrudInterface {
  isLoading = false;
  private categoriesTree: CategoryTree[] = []
  private categoryTree?:CategoryTree
  public categoriesTreeSelected: CategoryTree[] = []
  /*ESTE HISTORIAL GUARDARA LA INFORMACION PASADA  */
  private history: History[] = []



  public componentSelected: COMPONENT_TYPES = COMPONENT_TYPES.CATEGORY
  public CT = COMPONENT_TYPES

  /* */

  constructor(
    private categoryService: CategoryService,
    private appointmentTempService: AppointmentTempService,
    private loadingService:LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingService.hide()
    this.readCRUD()
  }


  readCRUD(): boolean {
    this.isLoading = true;
    this.categoryService.all().subscribe({
      complete: () => { },
      next: (r: Category[]) => {
        this.isLoading = false;

        this.categoriesTree = CategoryHelpers.convertTableToTree(r)
        this.categoriesTreeSelected = this.categoriesTree;

        console.log(this.categoriesTree)
      },
      error: () => {

      }
    });

    return true
  }

  next(type: COMPONENT_TYPES, catId: number) {
    if (type == COMPONENT_TYPES.CATEGORY) {
      const c = this.categoriesTreeSelected.filter(row => row.catId == catId);
      if (c[0].children && c[0].children.length > 0) {
        this.history.push({ type: this.CT.CATEGORY, history: this.categoriesTreeSelected })
        this.categoriesTreeSelected = c[0].children
      } else {
        //activar el componente teclado
        this.history.push({ type: COMPONENT_TYPES.CATEGORY, history: this.categoriesTreeSelected })
        if(this.isAuthRequired(c[0]))
          this.componentSelected = COMPONENT_TYPES.KEYBOARD
      }
      this.categoryTree=c[0]
    }

    if (type == COMPONENT_TYPES.KEYBOARD) {
      this.componentSelected = COMPONENT_TYPES.KEYBOARD

    }
  }


  back() {
    if (this.history && this.history.length > 0) {
      if (this.history[this.history.length - 1].type == this.CT.CATEGORY) {
        this.categoriesTreeSelected = this.history[this.history.length - 1].history
        this.history.splice(-1, 1)
        this.componentSelected = COMPONENT_TYPES.CATEGORY
      }

      if (this.history[this.history.length - 1].type == this.CT.KEYBOARD) {
        this.componentSelected = COMPONENT_TYPES.KEYBOARD
      }
    }
  }

  home(){
    
  }

  isAuthRequired(categoryTree: CategoryTree){
    if(categoryTree.catAuth && categoryTree.catAuth!=CATEGORY_TYPES_AUTH.NEITHER){
      return true;
    }else{
      return false
    }
  }
  isTelRequired(){

  }
  

  nextKeyboard() {
    this.componentSelected = COMPONENT_TYPES.KEYBOARD
  }

  onSendValue(event:string){
    console.log("**Evento enviar valor capturado por teclado **",event, this.categoryTree)
    const a:AppointmentTemp={catId:this.categoryTree?.catId, apptmNumberDocClient:event}
    this.createCRUD(a)
  }

  /*aqui se crear un registro para citas */
  createCRUD(object: AppointmentTemp): boolean {
    this.appointmentTempService.add(object).subscribe({
      next: d=>{
        console.log("data de appointment ", d)
      }, 
      error: e=>{
        console.log("ERROR", e)
      }
    })

    return false
  }
  deleteCRUD(ids: string | number | string[] | number[] | null): boolean {
    return true;
  }
  updateCRUD(object: any, id: string | number | null): boolean {
    return false;
  }

}

export enum COMPONENT_TYPES {
  KEYBOARD = 2,
  CATEGORY = 1,
  LOADING=3
}
export interface History {
  type: COMPONENT_TYPES,
  history: CategoryTree[] | any | null
}