import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BusinessHelpers } from 'src/app/global/helpers/business.helpers';
import { Bussines } from 'src/app/interfaces/bussines';
import { BussinesService } from 'src/app/services/bussines.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { CopyService } from 'src/app/shared/services/copy/copy.service';




@Component({
  selector: 'app-info-afiliation',
  templateUrl: './info-afiliation.component.html',
  styleUrls: ['./info-afiliation.component.scss']
})
export class InfoAfiliationComponent implements OnInit {

  @Input() afi: Bussines | undefined;
  @Output() onLoading = new EventEmitter<Bussines>();
  showAfiliacion = true;
  showAfiliacionEdit = false;
  bh: BusinessHelpers = new BusinessHelpers();

  constructor(
    private fb: FormBuilder,
    private businessSevice: BussinesService,
    private showMessage: ShowMessageService,
    private copyService:CopyService
    
    
  ) { }

  ngOnInit(): void {

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

  datosAfiliationForm: FormGroup = this.fb.group({
    afiliation : this.fb.group({
      bussSunatUser : [''],
      bussSunatPass : [''],
      bussCodeSend : [''],
      bussCodeRNP : [''],
      bussAfpUser : [''],
      bussAfpPass : [''],
      bussSimpleCode : [''],
      bussDetractionsPass : [''],
      bussSisClave : ['']
    })
  });

  setTypeDialog() {
    this.datosAfiliationForm.get('afiliation.bussSunatUser')?.setValue(this.afi?.bussSunatUser);
    this.datosAfiliationForm.get('afiliation.bussSunatPass')?.setValue(this.afi?.bussSunatPass);
    this.datosAfiliationForm.get('afiliation.bussCodeSend')?.setValue(this.afi?.bussCodeSend);
    this.datosAfiliationForm.get('afiliation.bussCodeRNP')?.setValue(this.afi?.bussCodeRNP);
    this.datosAfiliationForm.get('afiliation.bussAfpUser')?.setValue(this.afi?.bussAfpUser);
    this.datosAfiliationForm.get('afiliation.bussAfpPass')?.setValue(this.afi?.bussAfpPass);
    this.datosAfiliationForm.get('afiliation.bussSimpleCode')?.setValue(this.afi?.bussSimpleCode);
    this.datosAfiliationForm.get('afiliation.bussDetractionsPass')?.setValue(this.afi?.bussDetractionsPass);
    this.datosAfiliationForm.get('afiliation.bussSisClave')?.setValue(this.afi?.bussSisClave);
  }

  showEditAfiliacion(){
    this.showAfiliacion = !this.showAfiliacion;
    this.showAfiliacionEdit = !this.showAfiliacionEdit;
    if(this.showAfiliacionEdit){
      this.setTypeDialog();
    }
  }

  UpdAfiliation(): boolean {
    const business : Bussines = this.datosAfiliationForm.value;
    business.bussId = this.afi?.bussId;
    //console.log("formulario"+JSON.stringify(business));

    this.businessSevice.updAfiliationData(business).subscribe({
      next: data=>{
        //console.log("devuelto buss"+JSON.stringify(data.data));

        this.showMessage.success({message: data.msg})
        this.showAfiliacion = !this.showAfiliacion;
        this.showAfiliacionEdit = !this.showAfiliacionEdit;
        this.onLoading.emit(this.afi);
      },
      error: error=>{
        this.showMessage.error({message: error.error.message, action:()=>this.UpdAfiliation()})
      }
    })
    return true;
  }

  beforeCopy(keyName:string, copiedWord?:string){
    this.copyService.copy(keyName, copiedWord)
  }
}

interface GridResponsive {
  [key: string]: number
}
