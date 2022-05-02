import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info-business',
  templateUrl: './info-business.component.html',
  styleUrls: ['./info-business.component.scss']
})
export class InfoBusinessComponent implements OnInit {

  showBusiness = true;
  showBusinessEdit = false;

  constructor(
    private fb: FormBuilder,
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

  datosBusinesForm: FormGroup = this.fb.group({
    business : this.fb.group({
      bussKind : ['',Validators.required],
      bussName : ['',Validators.required],
      bussRuc : ['',Validators.required],
      bussAddress :[''],
      bussFileKind : ['',Validators.required],
      bussFileNumber : ['',Validators.required],
      bussState : ['',Validators.required]
    })
  });

  showEditBusiness(){
    this.showBusiness = !this.showBusiness;
    this.showBusinessEdit = !this.showBusinessEdit;
  }

}

interface GridResponsive {
  [key: string]: number
}
