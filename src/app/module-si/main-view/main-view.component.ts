import { Component, HostListener, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { map, shareReplay, startWith } from 'rxjs/operators';
import {MatSidenavModule, MatSidenav} from '@angular/material/sidenav';
import { LoadingService } from 'src/app/shared/components/loading/loading.service';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { ThisReceiver } from '@angular/compiler';
import { User } from 'src/app/interfaces/user';
import {PMS} from 'src/app/core/permission/pms.enum'
import { MainViewService } from './main-view.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss'],
  providers:[MainViewService]

})

export class MainViewComponent implements OnInit {
  showMenu = false;
  value = 'Clear me';
  currentUser!: User;


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

      if(!this.tokenService.getUser()){
        this.signOut();
      }
      const u=this.tokenService.getUser()
      if(u){
        this.currentUser = u as User
        console.log(this.currentUser)
      } else{
        this.signOut();
      }
  }
  ngOnInit(): void {
      this.loadingService.stop()
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
    /*.then(() => {
      window.location.reload();
    });*/
  }
  mainMenu:Menu[]=[
    {isDisplay:false, name:'Principal',routerLink:'./', icon:'home', permission:PMS.SI_SEE,
      subMenu:[

      ]
    },
    {isDisplay:false, name:'Clientes',routerLink:'./clients', icon:'business', permission:PMS.SI_CLIENTS_SEE,
      subMenu: [

      ]
    },
    {isDisplay:false, name:'Linea de Espera',routerLink:'./', icon:'tablet', permission:PMS.SI_SEE,
      subMenu:[
        {name:'Atencion', routerLink:'./calls', permission: PMS.SI_CALLS_SEE},
        {name: 'Tickets', routerLink: './tickets', permission: PMS.SI_TICKETS_SEE},
        {name: 'Ventanillas', routerLink:'./tellers', permission: PMS.SI_TELLERS_SEE},
        {name: 'Categorias', routerLink:'./categories', permission:PMS.SI_CATEGORIES_SEE},
        {name: 'Videos', routerLink:'./videos', permission: PMS.SI_VIDEOS_SEE},
        {name: 'Tarjetas', routerLink:'./cards', permission:PMS.SI_CARDS_SEE}

      ]
    },
   
    {isDisplay:false, name:'Contabilidad',routerLink:'./', icon:'payment', permission:PMS.SI_REPORT_WAITING_LINE,
    subMenu: [
      {name:'Contabilidad', routerLink:'./accounting', permission: PMS.SI_SEE},

    ]
    },
    {isDisplay:false, name:'Reportes',routerLink:'./', icon:'pie_chart', permission:PMS.SI_REPORT_WAITING_LINE,
    subMenu: [
      {name:'Hoy', routerLink:'./reports/today', permission: PMS.SI_REPORT_WAITING_LINE},
      {name:'Linea de espera', routerLink:'./reports/waiting-line', permission: PMS.SI_REPORT_WAITING_LINE},
    ]
  },
    {isDisplay:false, name:'Usuarios',routerLink:'./', icon:'people', permission:PMS.SI_USERS_SEE,
      subMenu:[
        {name: 'Usuarios', routerLink: './users' , permission: PMS.SI_USERS_SEE},
        {name: 'Permisos', routerLink: './permissions', permission: PMS.SI_PERMISSIONS_SEE}
      ]
    },
    {isDisplay:false, name:'Configuración',routerLink:'./settings', icon:'business', permission:PMS.SI_SEE,
      subMenu: [
        {name: 'Periodos', routerLink: './periods' , permission: PMS.SI_USERS_SEE},
        {name: 'Servicios', routerLink: './services' , permission: PMS.SI_USERS_SEE},
        {name: 'Metodos de Pago', routerLink: './payment-methods' , permission: PMS.SI_USERS_SEE}

      ]
    },
    {isDisplay:false, name:'Sedes',routerLink:'./headquarters', icon:'place', permission:PMS.SI_USERS_SEE,
    subMenu:[

    ]
  },
  {isDisplay:false, name:'Mi perfil',routerLink:'./profile', icon:'person', permission:PMS.SI_PROFILE_SEE,
  subMenu:[

  ]
}

  ]
}


interface Menu {
  isDisplay: boolean,
  name:string,
  routerLink:string
  icon:string
  subMenu:SubMenu[],
  permission: PMS
}

interface SubMenu{
  name:string,
  routerLink:string,
  permission:PMS
}
