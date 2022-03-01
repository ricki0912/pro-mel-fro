import { Component, HostListener, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import {MatSidenavModule, MatSidenav} from '@angular/material/sidenav';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';


@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
  
})

export class MainViewComponent implements OnInit {
  showMenu = false;

  value = 'Clear me';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private loadingService: LoadingService) {
    console.log(this.isHandset$)

  
  }

  ngOnInit(): void {
      this.loadingService.hide()
  }


  toggle(nav: MatSidenav) {
    const isSmallScreen = this.breakpointObserver.isMatched(
      "(max-width: 599px)"
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













  
}
