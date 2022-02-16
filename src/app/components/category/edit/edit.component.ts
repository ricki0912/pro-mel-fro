import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MediaObserver, MediaChange} from '@angular/flex-layout'
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import {CategoryService } from '../../../services/category.service'
import { FindCategoryComponent } from '../find-category/find-category.component';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  category: Category= {
      name: '',
      code: '', 
      description: ''
    };
  
  cols : number=1;
  gridByBreakpoint : GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }


  openDialogFindCategory=()=>{
    const dialogRefFindCategory=this.dialogFindCategory.open(FindCategoryComponent, {
      /*maxWidth: '100vw',
       maxHeight: '100vh',
       height: '100%',
       width: '100%',*/
       panelClass: 'dialog', 
       data:[]
     });
     dialogRefFindCategory.afterClosed().subscribe(result=>{
       console.log(`Dialog result: ${result}`)
     });
  }

  mediaSub!: Subscription;
  constructor(public mediaObserver: MediaObserver, private service: CategoryService, public dialogFindCategory: MatDialog) { 
    //this.grid.cols=1
  }


  ngOnInit(): void {
    this.mediaSub=this.mediaObserver.media$.subscribe((result: MediaChange)=>{
      console.log(result.mqAlias)
      let mqAlias: string  = String(result.mqAlias);
      this.cols =this.gridByBreakpoint[mqAlias];

    })  
  }

  ngOnDestroy(): void{
    this.mediaSub.unsubscribe();
  }

  save():void{

  }

  add(indicator: String, categoryObject: Category){
    
    /*console.log(Object.getPrototypeOf(indicator)); // true    */
    console.log(categoryObject)
    this.service.add(indicator, categoryObject).subscribe((r:any)=> {
      console.log(r)
    })
  }
}

interface GridResponsive{
  [key: string]: number
}

