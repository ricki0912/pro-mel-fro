import { Component, Inject, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { Services } from 'src/app/interfaces/services';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { ServicesService } from 'src/app/services/services.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-organize-services',
  templateUrl: './organize-services.component.html',
  styleUrls: ['./organize-services.component.scss']
})
export class OrganizeServicesComponent implements OnInit {

  isLoading:boolean=true;
  title = 'Organiza y ordena los servicios';
  serviceBeforeUpd: Services | null = null;
  services:Services[]=[]

  constructor(
    public mediaObserver: MediaObserver,
    private serviceService: ServicesService,
    private showMessage: ShowMessageService,
    //@Inject(DOCUMENT) private document: Document


    
  ) { }

  ngOnInit(): void {
    this.readCRUD()
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      let mqAlias: string = String(result.mqAlias);
      this.cols = this.gridByBreakpoint[mqAlias];
    })
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

  cols: number = 1;
  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }
  mediaSub!: Subscription;

  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX - The Rise of Skywalker',
  ];

  drop(event: CdkDragDrop<Services[]>) {
    
    moveItemInArray(this.services, event.previousIndex, event.currentIndex);
  }
    /*onDragMoved(event:any){
      let h=this.document.getElementById('container');
      if (event.delta.x === 1 && h) {
        h.scrollLeft += 10;
    } else if(h){
        h.scrollLeft -= 10;
    }
  }*/

  /*
  drop(event: CdkDragDrop<{title: string; poster: string}[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }*/


  readCRUD(): boolean {
    this.isLoading = true;
    this.serviceService.all()?.subscribe({
      next: data => {
      this.services = data;
        this.isLoading = false
      },
      error: error => {
        this.isLoading = false
      }
    })
    return false;
  }

  reOrderBefore(){
    let ids = this.services.reduce((a: number[], b: Services) => (b.svId == null) ? a : [...a, b.svId], []);
    this.reOrder(ids)
  }

  reOrder(id: number[]): boolean {
    this.isLoading = true;

    this.serviceService.reOrder(id).subscribe({
      next: data=>{
        this.showMessage.success({message: data.msg});
        this.isLoading = false

      },
      error: error=>{
       this.showMessage.error({message: error.error.message})
       this.isLoading = false

      }
    })
    return true;
  }
  
}


interface GridResponsive {
  [key: string]: number
}