import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info-afiliation',
  templateUrl: './info-afiliation.component.html',
  styleUrls: ['./info-afiliation.component.scss']
})
export class InfoAfiliationComponent implements OnInit {

  showAfiliacion = true;
  showAfiliacionEdit = false;

  constructor(
    private fb: FormBuilder
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

  datosAfiliacionForm: FormGroup = this.fb.group({
    afiliacion : this.fb.group({
      bussSunatUser : ['',Validators.required],
      bussSunatPass : ['',Validators.required],
      bussCodeSend : ['',Validators.required],
      bussCodeRNP : ['',Validators.required],
      bussAfpUser : ['',Validators.required],
      bussAfpPass : ['',Validators.required]
    })
  });

  showEditAfiliacion(){
    this.showAfiliacion = !this.showAfiliacion;
    this.showAfiliacionEdit = !this.showAfiliacionEdit;
  }

}

interface GridResponsive {
  [key: string]: number
}
