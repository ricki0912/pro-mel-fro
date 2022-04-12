import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  
  cols: number = 1;
  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }
  mediaSub!: Subscription;

  passwordForm: FormGroup = this.fb.group({

    password: ['', {
      validators: [Validators.required, Validators.minLength],
    }],
  });
  constructor(
    private fb: FormBuilder, /*es apra los formularios */
    private dialogRef: MatDialogRef<ChangePasswordComponent>,

  ) { }

  ngOnInit(): void {
  }

  

  beforeSave() {
    this.dialogRef.close(this.passwordForm.value)
  }


}
interface GridResponsive {
  [key: string]: number
}
