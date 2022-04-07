

import { Component, OnInit } from '@angular/core';
import { CrudInterface } from 'src/app/global/interfaces/crud.interface'
import { CategoryService } from 'src/app/services/category.service';
import { Category, CategoryTree, CATEGORY_TYPES_AUTH } from 'src/app/interfaces/category'
import { CategoryHelpers } from 'src/app/global/helpers/category.helpers'
import { ThisReceiver } from '@angular/compiler';
import { AppointmentTempService } from 'src/app/services/appointment-temp.service';
import { AppointmentTemp } from 'src/app/interfaces/appointment-temp';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { DatePipe } from '@angular/common'
import { HeadService } from './pages/head/head.service';
import { AlertService } from './pages/alert/alert.service';


declare var electron: any;

@Component({
  selector: 'app-ticket-dispensing',
  templateUrl: './ticket-dispensing.component.html',
  styleUrls: ['./ticket-dispensing.component.scss']
})
export class TicketDispensingComponent implements OnInit {
  /*Lista de categorias de base de datos */
  private categoriesTree: CategoryTree[] = []

  /*Categoria actual seleccionada */
  public categoryTree!: CategoryTree

  public categoriesTreeSelected: CategoryTree[] = []

  /*ESTE HISTORIAL GUARDARA LA INFORMACION PASADA  */
  public history: History[] = []

  /*Se determina que componente se seleccionó y sobre que componente se debe trabajar*/
  public componentSelected: COMPONENT_TYPES = COMPONENT_TYPES.CATEGORY
  public CT = COMPONENT_TYPES

  /* Appointment*/
  private appointmentTemp:AppointmentTemp={}




  /*Loading*/
  loadingMessage: string = ''
  //public alertMessage:string=''
  
  /* */

  constructor(
    private categoryService: CategoryService,
    private appointmentTempService: AppointmentTempService,
    private loadingService: LoadingService,
    public datepipe: DatePipe,
    private headService:HeadService,
    private alertService:AlertService
  ) { }

  ngOnInit(): void {
    this.loadingService.hide()
    this.readCategoriesCRUD()
  }

  private isAuthRequired(categoryTree: CategoryTree) {
    if (categoryTree.catAuth && categoryTree.catAuth != CATEGORY_TYPES_AUTH.NEITHER) {
      return true;
    } else {
      return false
    }
  }

  private isTelRequired() {

  }


  nextKeyboard() {
    this.componentSelected = COMPONENT_TYPES.KEYBOARD
  }

  /*Acciones ejectuada al final de un arbol de categorias */

  /*Accion ejecutada por el teclado */

  /*onClick en keyboard*/
  public onAuth(e: AppointmentTemp) {
    console.log("**Evento enviar valor capturado por teclado **", event, this.categoryTree)
    const a: AppointmentTemp = {
      catId: this.categoryTree?.catId,
      apptmNumberDocClient: e.apptmNumberDocClient,
      apptKindClient: e.apptKindClient,
      bussId: e.bussId
    }
    this.appointmentTemp=a;
    this.createAppointmentCRUD(a)
  }


  /*onClick en categorias */
  public onClickCategory(catId: number) {
    const cts = this.getCategoriesTreeSelected()
    const c = cts.filter(row => row.catId == catId);
    if (c[0].children && c[0].children.length > 0) {
      this.history.push({ type: COMPONENT_TYPES.CATEGORY, history: c[0].children })
      //this.categoriesTreeSelected = c[0].children        
    } else {
      //activar el componente teclado
      //this.history.push({ type: COMPONENT_TYPES.CATEGORY, history: this.categoriesTreeSelected })
      if (this.isAuthRequired(c[0])) {
        this.history.push({ type: COMPONENT_TYPES.KEYBOARD, history: {} })
        this.componentSelected = COMPONENT_TYPES.KEYBOARD
      } else {
        this.appointmentTemp={
          catId: this.categoryTree?.catId,
        }
        this.createAppointmentCRUD(this.appointmentTemp)

      }
    }
    this.categoryTree = c[0]
  }



  /* Controles de los tres opciones del teclado*/
  /* public next(type: COMPONENT_TYPES, catId: number) {
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
   }*/
  public getCategoriesTreeSelected(): CategoryTree[] {
    return (this.history && this.history.length > 0) ? this.history[this.history.length - 1].history : []
  }


  public back() {
    console.log("*BACKWARDS*", this.history)
    if (this.history && this.history.length > 1) {
      this.history.splice(-1)
      if (this.history[this.history.length - 1].type == this.CT.CATEGORY) {
        this.categoriesTreeSelected = this.history[this.history.length - 1].history
        this.componentSelected = COMPONENT_TYPES.CATEGORY
        this.headService.setMessage("Bienvenido, por favor seleccione un servicio.")
        
      }

      if (this.history[this.history.length - 1].type == this.CT.KEYBOARD) {
        this.categoriesTreeSelected = this.history[this.history.length - 1].history
        this.componentSelected = COMPONENT_TYPES.KEYBOARD
      }
    }
  }

  public home() {
    this.history.splice(1);  
    this.componentSelected = COMPONENT_TYPES.CATEGORY
    this.headService.setMessage("Bienvenido, por favor seleccione un servicio.")

    

  }
  


  /*Conexion API */
  /*Leer Categorias */
  readCategoriesCRUD(): boolean {
    this.categoryService.all().subscribe({
      complete: () => { },
      next: (r: Category[]) => {
        this.categoriesTree = CategoryHelpers.convertTableToTree(r)
        this.categoriesTreeSelected = this.categoriesTree;
        this.history.push({ type: COMPONENT_TYPES.CATEGORY, history: this.categoriesTreeSelected })
        this.headService.setMessage("Bienvenido, por favor seleccione un servicio.")

      },
      error: () => {

      }
    });

    return true
  }


  /*aqui se crear un registro para citas */
  private createAppointmentCRUD(object: AppointmentTemp): boolean {
    this.headService.setMessage('')
    this.componentSelected = COMPONENT_TYPES.LOADING
    this.loadingMessage = 'Por favor espere. Estamos procesando tu solicitud.'
    this.appointmentTempService.add(object).subscribe({
      next: d => {
        const data=d.data as AppointmentTemp[];
      

        this.printTicket(data[0])
      },
      error: e => {
        this.alertService.error({
          message:e.error.message.match(/(?<=<msg>)(.*)(?=<msg>)/s)[0],
          comeBack: ()=>this.home(),
          tryAgain: ()=>this.createAppointmentCRUD(object)
        })
        //this.alertMessage=e.error.message.match(/(?<=<msg>)(.*)(?=<msg>)/s)[0]
        this.componentSelected=COMPONENT_TYPES.ALERT;

      }
    })
    return false
  }


  private printTicket(d:AppointmentTemp) {
    this.componentSelected=COMPONENT_TYPES.ALERT;
    this.alertService.success({
      message:"Gracias por su preferencia. No olvide recoger su ticket y esperar su turno.",
      success: ()=>this.home()
    })
    const t={
      dateTicket:this.dateFormat(d), 
      numberTicket:this.joinCodeTicket(d), 
      categoryTicket:d.teller?.tellCode/*ventanilla*/
    } 
    try {
      electron.ipcRenderer.send('print-ticket', t)

    } catch (error) {
      
    }
   
  }
  dateFormat(d:AppointmentTemp){
    let t=''
    if(d.apptmDateTimePrint){    
      t=this.datepipe.transform(new Date(d.apptmDateTimePrint), 'dd/MM/yyyy hh:mm:ss a')||'';
    }
    return t;
  }
  joinCodeTicket(element: AppointmentTemp) {
    return element.catCode + String(element.apptmNro).padStart(2, '0')
  }

}

export enum COMPONENT_TYPES {
  KEYBOARD = 2,
  CATEGORY = 1,
  LOADING = 3,
  ALERT=4
}
export interface History {
  type: COMPONENT_TYPES,
  history: CategoryTree[] | any | null
}