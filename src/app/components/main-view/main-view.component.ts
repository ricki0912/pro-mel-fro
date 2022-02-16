import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay, startWith } from 'rxjs/operators';
import {MatSidenavModule, MatSidenav} from '@angular/material/sidenav';
import {FormControl} from '@angular/forms';


export interface State {
  flag: string;
  name: string;
  population: string;
}

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
  
})


export class MainViewComponent {
  showMenu = false;

  value = 'Clear me';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver) {
    console.log(this.isHandset$)

    this.filteredStates = this.stateCtrl.valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this._filterStates(state) : this.states.slice())
    );
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

  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;

  states: State[] = [
    {
      name: 'Arkansas',
      population: '2.978M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Arkansas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Flag_of_Arkansas.svg'
    },
    {
      name: 'California',
      population: '39.14M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_California.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Flag_of_California.svg'
    },
    {
      name: 'Florida',
      population: '20.27M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Florida.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Florida.svg'
    },
    {
      name: 'Texas',
      population: '27.47M',
      // https://commons.wikimedia.org/wiki/File:Flag_of_Texas.svg
      flag: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Flag_of_Texas.svg'
    }
  ];


  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().includes(filterValue));
  }





  
}
