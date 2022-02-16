import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { EditComponent } from './edit/edit.component';
import { FindCategoryComponent } from './find-category/find-category.component';

interface FoodNode {
  name: string;
  count: number;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    count:0,
    children: [
      {name: 'Apple', count: 10},
      {name: 'Banana', count: 20},
      {name: 'Fruit loops', count: 30},
    ]
  }, {
    name: 'Vegetables',
    count:0,
    children: [
      {
        name: 'Green',
        count:0,
        children: [
          {name: 'Broccoli', count: 10},
          {name: 'Brussel sprouts', count: 20},
        ]
      }, {
        name: 'Orange',
        count:0,
        children: [
          {name: 'Pumpkins', count: 30},
          {name: 'Carrots', count: 40},
        ]
      },
    ]
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  count: number;

  level: number;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

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



  openDialogEdit=()=>{
    const dialogRef=this.dialogEditUser.open(EditComponent, {
      /*maxWidth: '100vw',
       maxHeight: '100vh',
       height: '100%',
       width: '100%',*/
       panelClass: 'dialog', 
       data:[]
     });
     dialogRef.afterClosed().subscribe(result=>{
       console.log(`Dialog result: ${result}`)
     });
  }


  ngOnInit(): void {
  }

  displayedColumns: string[] = ['name', 'count','option'];
  
  private transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      count: node.count,
      level: level,
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, 
      node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor( public dialogEditUser: MatDialog, public dialogFindCategory: MatDialog) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}
