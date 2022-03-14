import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Category, CategoryTree, FlatTreeControlCategory } from 'src/app/interfaces/category';
import { ParentInterface } from 'src/app/global/parents/parent.interface';
import { CategoryService } from 'src/app/services/category.service';
import { LoadingService } from '../../shared/components/loading/loading.service';
import { CategoryHelpers } from './category.helpers';
import { EditComponent } from './pages/edit/edit.component';
import { CrudInterface } from 'src/app/global/interfaces/crud.interface';
import { ActionDialogInterface, TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, CrudInterface, ActionDialogInterface {
  isLoading = true;

  constructor(
    public dialogEditUser: MatDialog,
    private categoryService: CategoryService,
    private loadingService: LoadingService, 
    private showMessage: ShowMessageService
  ) {
    this.loadingService.show();
    this.dataSource.data = [];
    //this.dataSource.data = TREE_DATA;

  }
  
  ngOnInit(): void {
    this.readCRUD()
  }

  displayedColumns: string[] = ['catName', 'catCode', 'option'];

  private transformer = (node: CategoryTree, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,

      catId: (node.catId != null) ? node.catId : -1,
      catName: (node.catName == null) ? '' : node.catName,
      catCode: (node.catCode == null) ? '' : node.catCode,
      catNameLong: (node.catNameLong == null) ? '' : node.catNameLong,
      idParents: (node.idParents == null) ? [] : node.idParents,
      selected: false,

      level: level,
    };
  }

  treeControl = new FlatTreeControl<FlatTreeControlCategory>(

    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level,
    node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  hasChild = (_: number, node?: FlatTreeControlCategory) => node?.expandable;

  /**ABRIMOS LOS DIALOGOS */

  openDialogAdd(): boolean {
    const dialogRef = this.dialogEditUser.open(EditComponent, {
      panelClass: 'dialog',
      data: {
        row: null,
        rowParent: null,
        type: TYPES_ACTIONS_DIALOG.ADD
      }
    });
    dialogRef.afterClosed().subscribe((result:Category) => {
      if(result){
        this.createCRUD(result)
      }
    });
    return true
  }

  openDialogUpd(data: FlatTreeControlCategory): boolean {
    let copiedPerson = Object.assign({}, data);
    //data.
    const dialogRef = this.dialogEditUser.open(EditComponent, {
      /*maxWidth: '100vw',
       maxHeight: '100vh',
       height: '100%',
       width: '100%',*/
      panelClass: 'dialog',
      data: {
        row: data,
        rowParent: null,
        type: TYPES_ACTIONS_DIALOG.UPD
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.updateCRUD(result);
      }
    });
    return true;
  }

  openDialogdAddAndUpd(): boolean {
    return true;
  }

 

  openDialogAddToOne = (data: FlatTreeControlCategory) => {
    let copiedPerson = Object.assign({}, data);
    //data.
    const dialogRef = this.dialogEditUser.open(EditComponent, {
      /*maxWidth: '100vw',
       maxHeight: '100vh',
       height: '100%',
       width: '100%',*/
      panelClass: 'dialog',
      data: {
        row: null,
        rowParent: data,
        type: TYPES_ACTIONS_DIALOG.ADD
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.createCRUD(result)
      }
    });
  }


/*SERVICIOS DE BASE DE DATOS */
  createCRUD(object: Category): boolean {
    this.categoryService.add(object).subscribe({
      next: data=>{
        this.readCRUD()
        this.showMessage.success({message: data.msg})
      },
      error: error=>{
        this.showMessage.error({message: error.error.message, action:()=>this.createCRUD(object)})
      }
    })

    return true;
  }

  updateCRUD(object: Category ): boolean {
    this.categoryService.upd(object).subscribe({
      next: data=>{
        this.showMessage.success({message: data.msg})
        this.readCRUD()
      },
      error: error=>{
        this.showMessage.error({message: error.error.message, action:()=>this.updateCRUD(object)})
      }
    })

    return true;
  }

  readCRUD(): boolean {
    this.isLoading=true;
    this.categoryService.all().subscribe({
      complete: () => { },
      next: (r: Category[]) => {
        this.isLoading=false;
        this.dataSource.data = CategoryHelpers.convertTableToTree(r)
      },
      error: () => { 
      
      }
    });

    return true
  }
  beforeDelete(id:number){
    this.wantDelete(()=>this.deleteCRUD(id))
  }
  wantDelete(d:()=>void){
    this.dialogEditUser
      .open(DialogConfirmationComponent, {
        data: `Esta seguro que desea eliminar.`,
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          d();
        } else {
          
        }
      });
  }
  deleteCRUD(id: number): boolean {
    this.categoryService.del(id).subscribe({
      next: data=>{
        this.showMessage.success({message: data.msg});
        this.readCRUD();
      }, 
      error: error=>{
        this.showMessage.error({message: error.error.message})
      }
    })
    return true;
  }

}

