import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

//import { EROFS } from 'constants';
//import { User } from 'src/app/interfaces/user';
//import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  })
  submitted=false;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private fb: FormBuilder,
    private showMessageService: ShowMessageService,
    private loadingService: LoadingService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      
      this.reloadPage();
    }
    this.loadingService.hide();
  }

  onSubmit(o: User): void {
    this.loadingService.show()
    this.submitted=true
    this.authService.login(o.email, o.password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data.user);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.reloadPage();

        this.loadingService.hide();
        this.submitted=false

      },
      error: err => {
        this.showMessageService.error({ message: err.error.message })
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;

        this.loadingService.hide();
        this.submitted=false

      }
    });


  }

  reloadPage(): void {
    this.router.navigate([`si/${this.tokenStorage.getHqId()}`])
    //window.location.reload();
    /*this.router.navigate(['si'])
      .then(() => {
        window.location.reload();
      });*/
  }


}
