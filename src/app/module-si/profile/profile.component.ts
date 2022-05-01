import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser:User 

  userForm: FormGroup = this.fb.group({
    name: [''],
    email: ['', {
      validators: [Validators.required, Validators.email],
      asyncValidators: this.validateEmail.bind(this),
      updateOn: 'blur',
    }],
  
    roles: [''],
    person: this.fb.group({

      perKindDoc: ['', Validators.required],
      perNumberDoc: ['', Validators.required],
      perName: ['', Validators.required],
      perTel: ['', Validators.required]

    })
  });

  constructor(
    private tokenService:TokenStorageService,
    private fb: FormBuilder,
    private userSevice: UserService, /*creamos un servicio para conectarse a la db */
    private dialog: MatDialog,



  ) {
    this.currentUser=this.tokenService.getUser() as User

   }

  ngOnInit(): void {
    this.loadForm()
  }

  private loadForm(){

      this.userForm.controls['email'].setValue(this.currentUser.email);
      this.userForm.get('person.perName')?.setValue(this.currentUser.person.perName)
      this.userForm.get('person.perTel')?.setValue(this.currentUser.person.perTel)
      this.userForm.get('person.perKindDoc')?.setValue(this.currentUser.person.perKindDoc)
      this.userForm.get('person.perNumberDoc')?.setValue(this.currentUser.person.perNumberDoc)
      
  }
  private validateEmail(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.userSevice.existEmail(control.value)
      .pipe(
        map((user: User) => {
         if (!user) {
          return null;
        }
        if (this.currentUser?.email != user.email) {
          return { existEmail: 'El correo electronico esta en uso.' };
        }
        return null
        })
      )
  }

  updUserWithPerson(): boolean {
    const user: User = this.userForm.value;
    user.id = this.currentUser?.id
    user.person.perId = this.currentUser?.person.perId;

    return true
  }

  openDialogChangePassword(): boolean {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      panelClass: 'dialog',
      data: {
        row: this.currentUser,
        type: null
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        
      }
    });
    return false;
  }


}
