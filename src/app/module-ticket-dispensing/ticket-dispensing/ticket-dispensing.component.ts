

import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category, CategoryTree, CATEGORY_STATE, CATEGORY_TYPES_AUTH } from 'src/app/interfaces/category'
import { CategoryHelpers } from 'src/app/global/helpers/category.helpers'
import { AppointmentTempService } from 'src/app/services/appointment-temp.service';
import { AppointmentTemp, APPOINTMENT_SEND_FROM } from 'src/app/interfaces/appointment-temp';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { DatePipe } from '@angular/common'
import { HeadService } from './pages/head/head.service';
import { AlertService } from './pages/alert/alert.service';
import { SocketInterface, SOCKET_ACTION } from 'src/app/global/parents/socket.interface';
import { WaitingLineService } from 'src/app/socket/waiting-line.service';
import { ActivatedRoute } from '@angular/router';
import { CardsService } from 'src/app/services/cards.service';
import { Cards, CARDS_STATES } from 'src/app/interfaces/cards';
import { TicketDispensingService } from './ticket-dispensing.service';
import { ParamsTicketDispensing } from 'src/app/interfaces/params-ticket-dispensing';


declare var electron: any;

@Component({
  selector: 'app-ticket-dispensing',
  templateUrl: './ticket-dispensing.component.html',
  styleUrls: ['./ticket-dispensing.component.scss']
})
export class TicketDispensingComponent implements OnInit {

  private apptmSendFrom:string

  /*Cards */
  private cards:Cards[]=[]
  /* */
  private hqId: number = 0;
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
  private appointmentTemp: AppointmentTemp = {}




  /*Loading*/
  loadingMessage: string = ''
  //public alertMessage:string=''

  /* */

  constructor(
    private categoryService: CategoryService,
    private cardsService:CardsService,
    private appointmentTempService: AppointmentTempService,
    private loadingService: LoadingService,
    private datepipe: DatePipe,
    private headService: HeadService,
    private alertService: AlertService,
    private waitingLineService: WaitingLineService,
    private activatedRoute: ActivatedRoute,
    private _ticketDispensingService:TicketDispensingService
  ) { 
    this.apptmSendFrom=(electron)?APPOINTMENT_SEND_FROM.TICKET_DISPENSING:APPOINTMENT_SEND_FROM.WEB;
  }

  ngOnInit(): void {
    this.loadingService.hide()
    this.readCardsCrud()
    this.listenRoute(o => this.readCategoriesCRUD(o))
    this._ticketDispensingService.onComeBack.subscribe(e=>{
      this.back()
    })
    this._ticketDispensingService.onGoHome.subscribe(e=>{
      this.home()
    })
  }

  private listenRoute(c: (o: any) => void) {
    this.activatedRoute.params.subscribe(params => {
      this.hqId = parseInt(params['hqId'] || 0)
      c(this.hqId)
    })
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
      apptmNameClient:e.apptmNameClient,
      apptKindClient: e.apptKindClient,
      bussId: e.bussId,
      apptmSendFrom:this.apptmSendFrom
    }
    this.appointmentTemp = a;
    this.createAppointmentCRUD(a)
  }


  /*onClick en categorias */
  public onClickCategory(catId: number) {
    const cts = this.getCategoriesTreeSelected()
    const c = cts.filter(row => row.catId == catId);
    this.categoryTree = c[0]
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
        this.appointmentTemp = {
          catId: this.categoryTree?.catId,
        }
        this.createAppointmentCRUD(this.appointmentTemp)

      }
    }
  }

  onNextFindBusiness(){
    console.log("Next FInd bussines")
    this.history.push({type: COMPONENT_TYPES.FIND_BUSINESS, history:{}})
    this.componentSelected = COMPONENT_TYPES.FIND_BUSINESS

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
    if (this.history && this.history.length > 1) {
      this.history.splice(-1)
      if (this.history[this.history.length - 1].type == this.CT.CATEGORY) {
        this.categoriesTreeSelected = this.history[this.history.length - 1].history
        this.componentSelected = COMPONENT_TYPES.CATEGORY
        this.headService.setMessage("Seleccione un servicio.")

      }

      if (this.history[this.history.length - 1].type == this.CT.KEYBOARD) {
        this.categoriesTreeSelected = this.history[this.history.length - 1].history
        this.componentSelected = COMPONENT_TYPES.KEYBOARD
      }
      if (this.history[this.history.length - 1].type == this.CT.FIND_BUSINESS) {
        this.categoriesTreeSelected = this.history[this.history.length - 1].history
        this.componentSelected = COMPONENT_TYPES.FIND_BUSINESS
      }
    }
  }

  public home() {
    this.history.splice(1);
    this.componentSelected = COMPONENT_TYPES.CATEGORY
    this.headService.setMessage("Seleccione un servicio.")
  }



  /*Conexion API */
  /*Leer Categorias */
  readCategoriesCRUD(hqId: number): boolean {
    this.categoryService.allByHQ(hqId).subscribe({
      complete: () => { },
      next: (r: Category[]) => {


        this.categoriesTree = CategoryHelpers.convertTableToTree(r.filter(e=>e.catState==CATEGORY_STATE.ENABLE));
        this.categoriesTreeSelected = this.categoriesTree;
        this.history.push({ type: COMPONENT_TYPES.CATEGORY, history: this.categoriesTreeSelected })
        this.headService.setMessage("Seleccione un servicio.")

      },
      error: () => {

      }
    });

    return true
  }
  
  readCardsCrud():boolean{
    this.cardsService.all().subscribe({
      next:(d)=>{
        this.cards=d.filter(e=>(parseInt(e.cardState || "0") == CARDS_STATES.ENABLE))
      }, 
    })
    return true;
  }

  /*aqui se crear un registro para citas */
  private createAppointmentCRUD(object: AppointmentTemp): boolean {
    this.headService.setMessage('')
    this.componentSelected = COMPONENT_TYPES.LOADING
    this.loadingMessage = 'Espere un momento, estamos procesando tu solicitud.'
    this.appointmentTempService.add(object).subscribe({
      next: d => {
        const data = d.data as AppointmentTemp[];


        this.printTicket(data[0])
        this.setSocketWaitingLine(data[0].tellId || -1, { action: SOCKET_ACTION.WAITING_LINE_ADD_APPOINTMENT, data: data[0] })
      },
      error: e => {
        this.alertService.error({
          message: e.error.message.match(/(?<=<msg>)(.*)(?=<msg>)/s)[0],
          comeBack: () => this.home(),
          tryAgain: () => this.createAppointmentCRUD(object)
        })
        //this.alertMessage=e.error.message.match(/(?<=<msg>)(.*)(?=<msg>)/s)[0]
        this.componentSelected = COMPONENT_TYPES.ALERT;

      }
    })
    return false
  }



  private printTicket(d: AppointmentTemp) {
    console.log("Listo para imprimir", d)
    this.componentSelected = COMPONENT_TYPES.ALERT;
    this.alertService.success({
      message: "Gracias por su preferencia. No olvide recoger su ticket y esperar su turno.",
      success: () => this.home()
    })
    const t :ParamsTicketDispensing = {
      dateTicket: this.dateFormat(d),
      numberTicket: this.joinCodeTicket(d),
      tellerTicket: d.teller?.tellCode || '',/*ventanilla*/
      phraseTicket: this.cards[Math.floor(Math.random() * this.cards.length)].cardPhrases || '',
      codeQrTicket: 'http://melendresauditores.com/'
    }
    try {
      electron.ipcRenderer.send('print-ticket', t)

    } catch (error) {

    }

  }
  dateFormat(d: AppointmentTemp) {
    let t = ''
    if (d.apptmDateTimePrint) {
      t = this.datepipe.transform(new Date(d.apptmDateTimePrint), 'dd/MM/yyyy hh:mm:ss a') || '';
    }
    return t;
  }

  joinCodeTicket(element: AppointmentTemp) {
    return element.catCode + String(element.apptmNro).padStart(2, '0')
  }

  private setSocketWaitingLine(tellId: number, s: SocketInterface<AppointmentTemp>) {
    this.waitingLineService.setSocketLineWaiting(tellId, s)

  }

}

export enum COMPONENT_TYPES {
  KEYBOARD = 2,
  CATEGORY = 1,
  LOADING = 3,
  ALERT = 4, 
  FIND_BUSINESS=5
}
export interface History {
  type: COMPONENT_TYPES,
  history: CategoryTree[] | any | null
}