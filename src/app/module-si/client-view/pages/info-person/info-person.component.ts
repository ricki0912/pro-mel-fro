import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { map, Observable, Subscription } from 'rxjs';
import { BusinessHelpers } from 'src/app/global/helpers/business.helpers';
import { Bussines } from 'src/app/interfaces/bussines';
import { Person } from 'src/app/interfaces/person';
import { BussinesService } from 'src/app/services/bussines.service';
import { PersonService } from 'src/app/services/person.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';

@Component({
  selector: 'app-info-person',
  templateUrl: './info-person.component.html',
  styleUrls: ['./info-person.component.scss']
})

export class InfoPersonComponent implements OnInit {

  @Input() per: Bussines | undefined;
  @Output() onLoading = new EventEmitter<Bussines>();
  showPerson = true;
  showPersonEdit = false;
  bh: BusinessHelpers = new BusinessHelpers();

  constructor(
    private fb: FormBuilder,
    private businessSevice: BussinesService,
    private personService: PersonService,
    private showMessage: ShowMessageService
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

  datosPersonForm: FormGroup = this.fb.group({
    person : this.fb.group({
      perKindDoc : ['',Validators.required],
      perNumberDoc : ['', {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("[0-9]{8}")],
        asyncValidators: this.validateDNI.bind(this),
        updateOn: 'blur',
      }],
      perName : ['',Validators.required],
      perAddress : [''],
      perEmail : ['',{validators: [Validators.email]}],
      perTel :['', {validators: [Validators.minLength(9), Validators.maxLength(9), Validators.pattern("[9]{1}[0-9]{8}")]}],
      perTel2 :['', {validators: [Validators.minLength(9), Validators.maxLength(9), Validators.pattern("[9]{1}[0-9]{8}")]}],
      perTel3 :['', {validators: [Validators.minLength(9), Validators.maxLength(9), Validators.pattern("[9]{1}[0-9]{8}")]}]
    })
  });

  setTypeDialog() {
    this.datosPersonForm.get('person.perKindDoc')?.setValue(this.per?.person.perKindDoc);
    this.datosPersonForm.get('person.perNumberDoc')?.setValue(this.per?.person.perNumberDoc);
    this.datosPersonForm.get('person.perName')?.setValue(this.per?.person.perName);
    this.datosPersonForm.get('person.perEmail')?.setValue(this.per?.person.perEmail);
    this.datosPersonForm.get('person.perAddress')?.setValue(this.per?.person.perAddress);
    this.datosPersonForm.get('person.perTel')?.setValue(this.per?.person.perTel);
    this.datosPersonForm.get('person.perTel2')?.setValue(this.per?.person.perTel2);
    this.datosPersonForm.get('person.perTel3')?.setValue(this.per?.person.perTel3);
  }

  validateDNI(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.personService.existDni(control.value)
    .pipe(
      map((person: Person) => {
        if (2 == 2) {
          if (!person) {
            return null;
          }
          if (this.per?.person.perNumberDoc != person.perNumberDoc) {
            return { existDni: 'El Numero de DNI ya esta en uso.' };
          }
          return null
        }
        return (!person) ? null : { existDni: 'El Numero de DNI ya existe.' }
      })
    )
  }

  showEditPerson(){
    this.showPerson = !this.showPerson;
    this.showPersonEdit = !this.showPersonEdit;

    if(this.showPersonEdit) {
      this.setTypeDialog();
    }
  }

  UpdPerson(): boolean {
    const business : Bussines = this.datosPersonForm.value;
    business.person.perId = this.per?.person.perId;
    business.bussId = this.per?.bussId;
    //console.log(JSON.stringify(this.datosPersonForm.value));

    this.businessSevice.updPersonData(business).subscribe({
      next: data=>{
        //console.log("devuelto buss"+JSON.stringify(data.data));
        this.showMessage.success({message: data.msg})
        this.showPerson = !this.showPerson;
        this.showPersonEdit = !this.showPersonEdit;
        this.onLoading.emit(this.per);
      },
      error: error=>{
        this.showMessage.error({message: error.error.message, action:()=>this.UpdPerson()})
      }
    })
    return true;
  }

}

interface GridResponsive {
  [key: string]: number
}
