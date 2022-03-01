/*import {FlatTreeControl} from '@angular/cdk/tree';
import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import { Category, CategoryTree, FlatTreeControlCategory } from 'src/app/interfaces/category';
import { ParentInterface } from 'src/app/interfaces/parent';
import { CategoryService } from 'src/app/services/category.service';
import { LoadingService } from '../../shared/components/loading/loading.service';
import { CategoryHelpers } from './category.helpers';
import { EditComponent } from './edit/edit.component';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(
     public dialogEditUser: MatDialog, 
     private categoryService: CategoryService,
     private loadingService: LoadingService
     ) {
       this.dataSource.data=[];
    //this.dataSource.data = TREE_DATA;

    this.load()
  }

  pruebaevent(){
    this.loadingService.hide()
  }



  openDialogEdit=()=>{
    const dialogRef=this.dialogEditUser.open(EditComponent, {
      /*maxWidth: '100vw',
       maxHeight: '100vh',
       height: '100%',
       width: '100%',*/
     /*  panelClass: 'dialog', 
       data:[]
     });
     dialogRef.afterClosed().subscribe(result=>{
       console.log(`Dialog result: ${result}`)
     });
  }


  ngOnInit(): void {
    this.load();
  }

  displayedColumns: string[] = ['catName', 'catCode','option'];
  
  private transformer = (node: CategoryTree, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      
      catId: (node.catId!=null)?node.catId:-1,
      catName: (node.catName==null)?'':node.catName,
      catCode: (node.catCode==null)?'':node.catCode,
      catNameLong: (node.catNameLong==null)?'':node.catNameLong,
      idParents:(node.idParents==null)?[]:node.idParents,
      selected:false,
 
      level: level,
    };
  }

  load(){
    
    /*this.categoryService.all('').subscribe({
      complete:()=>{}
      next: this.handleUpdateResponse.bind(this),
      error: this.handleError.bind(this)
   });*/

/*
    this.categoryService.all().subscribe({
      complete:()=>{},
      next: (r:Category[])=>{
        
        this.dataSource.data=CategoryHelpers.convertTableToTree(r)
        console.log(this.dataSource.data);
      },
      error: ()=>{}
   });

    /*this.categoryService.all().subscribe((r:IndicatorSettings[])=> {
      //this.indicatorSettings=r
      this.isLoading = false;
      this.dataSource.data = r;
    }, error=>this.isLoading=false
    )*/
 /* }

  treeControl = new FlatTreeControl<FlatTreeControlCategory>(
     
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this.transformer, node => node.level, 
      node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node?: FlatTreeControlCategory) => node?.expandable;


  addCategory=(data:FlatTreeControlCategory)=>{
    data.catName="HOla"
    let copiedPerson = Object.assign({}, data);
    //data.
    const dialogRef=this.dialogEditUser.open(EditComponent, {
      /*maxWidth: '100vw',
       maxHeight: '100vh',
       height: '100%',
       width: '100%',*/
   /*    panelClass: 'dialog', 
       data:{
         row: data, 
         type: 1
        }
     });
     dialogRef.afterClosed().subscribe(result=>{
       console.log(`Dialog result: ${result}`)
     });  
    }

}*/
