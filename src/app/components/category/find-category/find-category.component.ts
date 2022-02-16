import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {MediaObserver, MediaChange} from '@angular/flex-layout'
import { Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/category';
import {CategoryService } from '../../../services/category.service'




import {NestedTreeControl} from '@angular/cdk/tree';

import {MatTreeNestedDataSource} from '@angular/material/tree';


@Component({
  selector: 'app-find-category',
  templateUrl: './find-category.component.html',
  styleUrls: ['./find-category.component.scss']
})
export class FindCategoryComponent implements OnInit, OnDestroy {
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

  mediaSub!: Subscription;
  constructor(public mediaObserver: MediaObserver, private service: CategoryService) { 
    //this.grid.cols=1
    this.dataSource.data = TREE_DATA;

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

  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FoodNode>();



  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
}

interface GridResponsive{
  [key: string]: number
}





interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];

