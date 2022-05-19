import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { map, Observable, Subscription } from 'rxjs';
import { Bussines } from 'src/app/interfaces/bussines';
import { BussinesService } from 'src/app/services/bussines.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';

@Component({
  selector: 'app-info-business',
  templateUrl: './info-business.component.html',
  styleUrls: ['./info-business.component.scss']
})

export class InfoBusinessComponent implements OnInit {

  @Input() buss: Bussines | undefined;
  @Output() onLoading = new EventEmitter<Bussines>();
  showBusiness = true;
  showBusinessEdit = false;

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

  datosBusinesForm: FormGroup = this.fb.group({
    business : this.fb.group({
      bussKind : ['',Validators.required],
      bussName : ['',Validators.required],
      bussRUC : ['', {
        validators: [Validators.required],
        asyncValidators: this.validateRuc.bind(this),
        updateOn: 'blur',
      }],
      bussAddress :[''],
      bussFileKind : ['',Validators.required],
      bussFileNumber : ['', {
        validators: [Validators.required],
        asyncValidators: this.validateFileNumber.bind(this),
        updateOn: 'blur',
      }],
      bussState : ['',Validators.required]
    })
  });

  setTypeDialog() {
    this.datosBusinesForm.get('business.bussKind')?.setValue(this.buss?.bussKind);
    this.datosBusinesForm.get('business.bussName')?.setValue(this.buss?.bussName);
    this.datosBusinesForm.get('business.bussRUC')?.setValue(this.buss?.bussRUC);
    this.datosBusinesForm.get('business.bussAddress')?.setValue(this.buss?.bussAddress);
    this.datosBusinesForm.get('business.bussFileKind')?.setValue(this.buss?.bussFileKind?.trim());
    this.datosBusinesForm.get('business.bussFileNumber')?.setValue(this.buss?.bussFileNumber);
    this.datosBusinesForm.get('business.bussState')?.setValue(this.buss?.bussState?.trim());
  }

  showEditBusiness(){
    this.showBusiness = !this.showBusiness;
    this.showBusinessEdit = !this.showBusinessEdit;
  }

  validateRuc(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.businessSevice.existRuc(control.value)
    .pipe(
      map((business: Bussines) => {
        if (2 == 2) {
          if (!business) {
            return null;
          }
          if (this.buss?.bussRUC != business.bussRUC) {
            return { existRuc: 'El numero de RUC esta en uso.' };
          }
          return null;
        }
        return (!business) ? null : { existRuc: 'El numero de RUC ya existe.' }
      })
    )
  }

  validateFileNumber(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.businessSevice.existFileNumber(control.value)
    .pipe(
      map((business: Bussines) => {
        if (2 == 2) {
          if (!business) {
            return null;
          }
          if (this.buss?.bussFileNumber != business.bussFileNumber) {
            return { existFileNumber: 'El Numero de Archivador ya esta en uso.' };
          }
          return null;
        }
        return (!business) ? null : { existFileNumber: 'El Numero de Archivador ya existe.' }
      })
    )
  }

  UpdBusiness(): boolean {
    const business : Bussines = this.datosBusinesForm.value;
    business.bussId = this.buss?.bussId;
    //console.log(JSON.stringify(business));

    this.businessSevice.updBusinessData(business).subscribe({
      next: data=>{
        //console.log("devuelto buss"+JSON.stringify(data.data));

        this.showMessage.success({message: data.msg})
        this.showBusiness = !this.showBusiness;
        this.showBusinessEdit = !this.showBusinessEdit;
        this.onLoading.emit(this.buss);
      },
      error: error=>{
        this.showMessage.error({message: error.error.message, action:()=>this.UpdBusiness()})
      }
    })
    return true;
  }

}

interface GridResponsive {
  [key: string]: number
}
