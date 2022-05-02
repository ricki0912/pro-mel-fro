import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info-aditional',
  templateUrl: './info-aditional.component.html',
  styleUrls: ['./info-aditional.component.scss']
})
export class InfoAditionalComponent implements OnInit {

  showAditional = true;
  showAditionalEdit = false;

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

  datosAdicionalForm: FormGroup = this.fb.group({
    adicional : this.fb.group({
      bussDateMembership : ['',Validators.required],
      bussDateStartedAct : ['',Validators.required],
      bussRegime : ['',Validators.required],
      bussKindBookAcc : ['',Validators.required],
      bussTel : ['',Validators.required],
      bussEmail : ['',Validators.required],
      bussObservation : ['',Validators.required]
    })
  });

  showEditOtros(){
    this.showAditional = !this.showAditional;
    this.showAditionalEdit = !this.showAditionalEdit;
  }

}

interface GridResponsive {
  [key: string]: number
}
