import { Component, HostListener, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { map, shareReplay, startWith } from 'rxjs/operators';
import {MatSidenavModule, MatSidenav} from '@angular/material/sidenav';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
  
})

export class MainViewComponent implements OnInit {
  showMenu = false;
  value = 'Clear me';
  currentUser: any;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
      private breakpointObserver: BreakpointObserver, 
      private loadingService: LoadingService,
      private tokenService: TokenStorageService,
      private router:Router
    ) {
    console.log(this.isHandset$)
  }
  ngOnInit(): void {
      this.loadingService.hide()
      if(!this.tokenService.getUser()){
        this.signOut();
      }
      this.currentUser = this.tokenService.getUser();
      console.log(this.currentUser)
  }


  toggle(nav: MatSidenav) {
    const isSmallScreen = this.breakpointObserver.isMatched(
      "(max-width: 620px)"
    );
    if (isSmallScreen) {
      nav.toggle();
    }
  }


  toggleMenu() {
    this.showMenu = !this.showMenu;
 }

 doChanges(){
   this.toggleMenu()
   //this.loadingService.show();

 }
 signOut(){
  this.tokenService.signOut();
  this.router.navigate(['auth/login'])
  .then(() => {
    window.location.reload();
  });
 }

}


