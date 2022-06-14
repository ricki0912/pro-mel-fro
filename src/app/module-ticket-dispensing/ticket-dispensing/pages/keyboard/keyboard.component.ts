import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppointmentTemp, APPOINTMENT_KIND_CLIENT } from 'src/app/interfaces/appointment-temp';
import { Bussines } from 'src/app/interfaces/bussines';
import { CategoryTree, CATEGORY_LINK_BUS, CATEGORY_TYPES_AUTH } from 'src/app/interfaces/category';
import { Person } from 'src/app/interfaces/person';
import { BussinesService } from 'src/app/services/bussines.service';
import { HeadService } from '../head/head.service';
import { ApiPeruService } from 'src/app/servicesx/api-peru.service'

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {
  @Output() onReturnValue = new EventEmitter<AppointmentTemp>()
  @Input() categoryTree!: CategoryTree
  public appointmentTemp?:AppointmentTemp


  value: string = '';
  bussines?: Bussines | null=null;
  person?:Person | null= null;

  //public message: string = '';
  state: boolean=false;
  loading:boolean=false;
 

  public keys: any = [
    [
      { value: 7, color: '', colspan: 1,rowspan:1, onClick: (value: number) => this.appendValue(value) },
      { value: 8, color: '', colspan: 1,rowspan:1, onClick: (value: number) => this.appendValue(value) },
      { value: 9, color: '', colspan: 1,rowspan:1, onClick: (value: number) => this.appendValue(value) },

    ],
    [
      { value: 4, color: '', colspan: 1,rowspan:1, onClick: (value: number) => this.appendValue(value) },
      { value: 5, color: '', colspan: 1,rowspan:1, onClick: (value: number) => this.appendValue(value) },
      { value: 6, color: '', colspan: 1,rowspan:1, onClick: (value: number) => this.appendValue(value) },
    ],
    [
      { value: 1, color: '', colspan: 1,rowspan:1, onClick: (value: number) => this.appendValue(value) },
      { value: 2, color: '', colspan: 1,rowspan:1, onClick: (value: number) => this.appendValue(value) },
      { value: 3, color: '', colspan: 1,rowspan:1, onClick: (value: number) => this.appendValue(value) },
    ],
    [
      { value: "", color: 'warm', colspan: 1,rowspan:1, onClick: (value: number) => this.clear() },
      { value: 0, color: '', colspan: 1,rowspan:1, onClick: (value: number) => this.appendValue(value) },
      { value: "", color: '', colspan: 1,rowspan:1, onClick: (value: number) => this.clearAll() },
    ],

  ]

  constructor(
    private bussinesService: BussinesService,
    private headService:HeadService,
    private apiPeruService:ApiPeruService

  ) {
  }

  ngOnInit(): void {
    this.loadMessage()
  }

  loadMessage(){
    let message:string=''
    if(this.categoryTree.catLinkBus==CATEGORY_LINK_BUS.YES && this.categoryTree.catAuth==CATEGORY_TYPES_AUTH.RUC){
      message='Por favor digite su número de RUC. '
    }else if(this.categoryTree.catAuth==CATEGORY_TYPES_AUTH.RUC){
      message='Por favor digite su número de RUC.'
    }else if(this.categoryTree.catAuth==CATEGORY_TYPES_AUTH.DNI){
      message='Por favor digite su número de DNI.'
    }else if(this.categoryTree.catAuth==CATEGORY_TYPES_AUTH.ANYONE){
      message='Por favor digite su número de DNI o RUC.'
    }
    
    this.headService.setMessage(message)

  }
  appendValue(value: number) {
    this.value += value
    this.beforeSearch() 

  }

  clear() {
    this.value = this.value.slice(0, -1)
    this.beforeSearch() 

  }

  clearAll() {
    this.value = ''
    this.beforeSearch() 

  }

  sendValue() {
    this.onReturnValue.emit(this.appointmentTemp)
  }

  beforeSearch() {
    
    const v = this.value
    const l = v.length
    
    if (this.categoryTree.catAuth == CATEGORY_TYPES_AUTH.DNI && l == 8/*longitud dni */) {
      this.existDniCRUDApiPeru(v, this.searchByDNI)
    } else if (this.categoryTree.catAuth == CATEGORY_TYPES_AUTH.RUC && this.categoryTree.catLinkBus == CATEGORY_LINK_BUS.YES && l == 11) {
      this.existRucCRUD(v, this.searchByRUCInBuss)
    } else if (this.categoryTree.catAuth == CATEGORY_TYPES_AUTH.RUC && l == 11) {
      this.existRucCRUDApiPeru(v, this.searchByRUC)
    } else if (this.categoryTree.catAuth == CATEGORY_TYPES_AUTH.ANYONE && l == 8 ) {
      this.existDniCRUDApiPeru(v, this.searchByDNI)
    }else if (this.categoryTree.catAuth == CATEGORY_TYPES_AUTH.ANYONE && l == 11 ) {
      this.existRucCRUDApiPeru(v, this.searchByRUC)
    }else{
      this.searchDefault();
    }
  }
  searchByDNI=(d:any)=> {
    console.log("DENTRO DE BUSSINES SIN ENLACE A BUSSINES Y API EXTERNO",d)
    if(this.value.length!=8){
      return;
    }
    if (d.success) {
      this.appointmentTemp={
        apptKindClient:APPOINTMENT_KIND_CLIENT.PERSON,
        
        apptmNumberDocClient: d.data.numero,
        apptmNameClient: this.nameOwn(d.data.nombre_completo)
      }

      //this.bussines = d;
      this.headService.setMessage(((d.data.sexo==="MASCULINO")?"Bienvenido ":"Bienvenida ")+this.nameOwn(d.data.nombres)+", seleccione en siguiente para generar una cita.")
      //this.message = d.bussName || ''
      this.state=true;
    }
    else {
      this.appointmentTemp={
        apptKindClient:APPOINTMENT_KIND_CLIENT.PERSON,
        apptmNumberDocClient:this.value
      }
      this.loadMessage()
      //this.message = ''
      this.state=true;
    }
  }

  searchByRUC=(d:any) =>{
    if(this.value.length!=11){
      return;
    }
    console.log("DENTRO DE BUSSINES SIN ENLACE A BUSSINES Y API EXTERNO",d)
    if (d.success) {
      this.appointmentTemp={
        apptKindClient:APPOINTMENT_KIND_CLIENT.BUSINESS,
        //bussId:d.bussId,
        apptmNumberDocClient: d.data.ruc,//d.bussRUC
        apptmNameClient:d.data.nombre_o_razon_social
      }

      //this.bussines = d;
      this.headService.setMessage("Bienvenido "+d.data.nombre_o_razon_social+", seleccione en siguiente para generar una cita.")
      //this.message = d.bussName || ''
      this.state=true;
    }
    else {
      this.appointmentTemp={
        apptKindClient:APPOINTMENT_KIND_CLIENT.BUSINESS,
        apptmNumberDocClient:this.value
      }
      this.loadMessage()
      //this.message = ''
      this.state=true;
    }
  }
  
  searchByRUCInBuss=(d:Bussines)=>{
    if (d) {
      this.appointmentTemp={
        apptKindClient:APPOINTMENT_KIND_CLIENT.BUSINESS,
        bussId:d.bussId,
        apptmNumberDocClient:d.bussRUC
      }
      
      this.bussines = d;
      this.headService.setMessage("Bienvenido "+d.bussName+", seleccione en siguiente para generar una cita.")
      //this.message = d.bussName || 'SIN NOMBRE'
      this.state=true;
    }
    else {
      this.appointmentTemp={}
      this.headService.setMessage("No fue posible encontrar tu RUC. Por favor verifique nuevamente o te sugerimos seleccionar uno de nuestros servicio de consulta.")
      //this.message = 'LO SENTIMOS. POR FAVOR REGRESE Y SELECCIONE OTRO SERVICIO.'
      this.state=false;
    }
  }

  searchDefault(){
    this.bussines=null
    this.person=null
    //this.message=''
    this.state=false
    this.loading=false
  }

  existRucCRUD(bussRUC: string, c: (d:Bussines) => void) {
    this.loading=true;
    this.bussinesService.existRuc(bussRUC).subscribe({
      next: d =>{
         c(d)
         this.loading=false;
        },
      error: e => {

      }

    });
  }

  existRucCRUDApiPeru(bussRUC: string, c: (d:any) => void) {
    this.loading=true;
    this.apiPeruService.findByRUC(bussRUC).subscribe({
      next: d =>{
         c(d)
         this.loading=false;
        },
      error: e => {

      }

    });
  }

  existDniCRUDApiPeru(dni: string, c: (d:any) => void) {
    this.loading=true;
    this.apiPeruService.findByDNI(dni).subscribe({
      next: d =>{
         c(d)
         this.loading=false;
        },
      error: e => {

      }

    });
  }




  existDniCRUD(perNumberDoc: string, c: (d:Person) => void) {
    this.person={perNumberDoc: perNumberDoc}
    //this.message=''
    this.state=true;
    this.appointmentTemp={
      apptKindClient:APPOINTMENT_KIND_CLIENT.PERSON,
      apptmNumberDocClient:this.value
    }
  }
 
  
private nameOwn(w:string):string{
  w=w.toLowerCase()
 return w.replace(/([^\s]+)/gm, function (t) {
    return t.charAt(0).toUpperCase() + t.substring(1);
});
}

}





