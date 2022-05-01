import { Injectable } from '@angular/core';
import { Teller } from 'src/app/interfaces/teller';
import { User } from 'src/app/interfaces/user';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): User|null {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  public hasPermission(path:string):boolean{
    let user=this.getUser()
    if(user){
      user=user as User
      const p=user.permissions as any
      return (p[path])?true:false
    }
    return false
  }

  public getTeller():Teller |null{
    const t=this.getUser();
    return (t)?(t.tellers)?t.tellers[0]:null:null
  }
  public getHqId():number{
    const t=this.getTeller();
    return (t)?(t.hqId)?t.hqId:0:0
  }
}
