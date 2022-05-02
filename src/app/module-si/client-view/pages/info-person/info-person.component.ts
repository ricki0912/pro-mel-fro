import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-info-person',
  templateUrl: './info-person.component.html',
  styleUrls: ['./info-person.component.scss']
})
export class InfoPersonComponent implements OnInit {

  showPerson = true;
  showPersonEdit = false;

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

  datosPersonForm: FormGroup = this.fb.group({
    person : this.fb.group({
      perKindDoc : ['',Validators.required],
      perNumberDoc : ['',Validators.required],
      perName : ['',Validators.required],
      perTel :[''],
      perEmail : [''],
      perAddress : ['']
    })
  });

  showEditPerson(){
    this.showPerson = !this.showPerson;
    this.showPersonEdit = !this.showPersonEdit;
  }

}

interface GridResponsive {
  [key: string]: number
}
