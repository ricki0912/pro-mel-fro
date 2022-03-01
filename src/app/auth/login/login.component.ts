import { Component, OnInit } from '@angular/core';
//import { EROFS } from 'constants';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide=true

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const user:User={
      userName:'Ricardo ',
      userPassword: 'casa'
    }
    this.authService.login(user).subscribe(
      r=>console.log(r),
      e=>console.log(e)
    )

  }

}
