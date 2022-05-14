import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Bussines } from 'src/app/interfaces/bussines';
import { BussinesService } from 'src/app/services/bussines.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';

@Component({
  selector: 'app-info-aditional',
  templateUrl: './info-aditional.component.html',
  styleUrls: ['./info-aditional.component.scss']
})
export class InfoAditionalComponent implements OnInit {

  @Input() adi: Bussines | undefined;
  showAditional = true;
  showAditionalEdit = false;

  constructor(
    private fb: FormBuilder,
    private businessSevice: BussinesService,
    private showMessage: ShowMessageService
  ) { }

  ngOnInit(): void {
    this.setTypeDialog();
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

  datosAditionalForm: FormGroup = this.fb.group({
    aditional : this.fb.group({
      bussDateMembership : ['',Validators.required],
      bussDateStartedAct : ['',Validators.required],
      bussRegime : [''],
      bussKindBookAcc : [''],
      bussTel : [''],
      bussEmail : [''],
      bussObservation : ['']
    })
  });

  setTypeDialog() {
    this.datosAditionalForm.get('aditional.bussDateMembership')?.setValue(this.adi?.bussDateMembership);
    this.datosAditionalForm.get('aditional.bussDateStartedAct')?.setValue(this.adi?.bussDateStartedAct);
    this.datosAditionalForm.get('aditional.bussRegime')?.setValue(this.adi?.bussRegime?.trim());
    this.datosAditionalForm.get('aditional.bussKindBookAcc')?.setValue(this.adi?.bussKindBookAcc?.trim());
    this.datosAditionalForm.get('aditional.bussTel')?.setValue(this.adi?.bussTel);
    this.datosAditionalForm.get('aditional.bussEmail')?.setValue(this.adi?.bussEmail);
    this.datosAditionalForm.get('aditional.bussObservation')?.setValue(this.adi?.bussObservation);
  }

  showEditAditional(){
    this.showAditional = !this.showAditional;
    this.showAditionalEdit = !this.showAditionalEdit;
  }

  UpdAditional(): boolean {
    const business : Bussines = this.datosAditionalForm.value;
    business.bussId = this.adi?.bussId;
    console.log("formulario"+JSON.stringify(business));

    this.businessSevice.updAditionalData(business).subscribe({
      next: data=>{
        //console.log("devuelto buss"+JSON.stringify(data.data));

        this.showMessage.success({message: data.msg})
        this.showAditional = !this.showAditional;
        this.showAditionalEdit = !this.showAditionalEdit;
      },
      error: error=>{
        this.showMessage.error({message: error.error.message, action:()=>this.UpdAditional()})
      }
    })
    return true;
  }

}

interface GridResponsive {
  [key: string]: number
}
