import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  /**/
  cols: number = 1;
  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }
  mediaSub!: Subscription;


  constructor(
    private dialogRef: MatDialogRef<RolesComponent>,
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: User, type: number },

  ) { }

  ngOnInit(): void {
  }
  beforeSave() {
    this.dialogRef.close()
  }


}
interface GridResponsive {
  [key: string]: number
}

