import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { Category, CategoryTree, CATEGORY_LINK_BUS, CATEGORY_STATE, CATEGORY_TYPES_AUTH, FlatTreeControlCategory } from 'src/app/interfaces/category';
import { ParentInterface } from 'src/app/global/parents/parent.interface';
import { CategoryService } from 'src/app/services/category.service';
import { LoadingService } from '../../shared/components/loading/loading.service';
import { CategoryHelpers } from '../../global/helpers/category.helpers';
import { EditComponent } from './pages/edit/edit.component';
import { CrudInterface } from 'src/app/global/interfaces/crud.interface';
import { ActionDialogInterface, TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';
import { MainViewService } from '../main-view/main-view.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, CrudInterface, ActionDialogInterface {
  private hqId:number=0;
  isLoading = true;

  private categoriesTypesAuth=new Map<number, string>()
  .set(CATEGORY_TYPES_AUTH.NEITHER, 'Ninguno')
  .set(CATEGORY_TYPES_AUTH.DNI, 'DNI')
  .set(CATEGORY_TYPES_AUTH.RUC, 'RUC')
  .set(CATEGORY_TYPES_AUTH.ANYONE, 'Cualquiera');
  
  private categoriesLinkClients=new Map<number, string>()
  .set(CATEGORY_LINK_BUS.YES, 'SI')
  .set(CATEGORY_LINK_BUS.NO,'NO')




  public CS=CATEGORY_STATE

  constructor(
    public dialogEditUser: MatDialog,
    private categoryService: CategoryService,
    private loadingService: LoadingService, 
    private showMessage: ShowMessageService,
    private mainViewService: MainViewService
  ) {
    this.dataSource.data = [];
    //this.categoriesTypesAuth.set(10 /*tellId*/,"V1" /*tellCode */)

    //this.dataSource.data = TREE_DATA;

  }
  
  ngOnInit(): void {
    this.listenRoute((o)=>this.readCRUD(o))
  }

  getTypeAuth(id:number){
    return this.categoriesTypesAuth.get(id)
  }
  isLinkBus(id:number){
    return this.categoriesLinkClients.get(id)
  }


  private listenRoute(c:(o:any)=>void){
    this.mainViewService.getParams().subscribe(params=>{
      this.hqId = parseInt(params['hqId'] || 0)
      c(this.hqId)
    })
  }

  displayedColumns: string[] = ['catName', 'catCode', 'catAuth', 'catLinkBus','option'];

  private transformer = (node: CategoryTree, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,

      catId: (node.catId != null) ? node.catId : -1,
      catName: (node.catName == null) ? '' : node.catName,
      catCode: (node.catCode == null) ? '' : node.catCode,
      catNameLong: (node.catNameLong == null) ? '' : node.catNameLong,

      catAuth: (node.catAuth==null)? 0:node.catAuth,
      catLinkBus: (node.catLinkBus==null)?0:node.catLinkBus,


      idParents: (node.idParents == null) ? [] : node.idParents,
      selected: false,


      catState: (node.catState==null)?0:node.catState,

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
        type: TYPES_ACTIONS_DIALOG.ADD,
        hqId:this.hqId
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
        type: TYPES_ACTIONS_DIALOG.UPD,
        hqId:this.hqId
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
        type: TYPES_ACTIONS_DIALOG.ADD,
        hqId:this.hqId
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
    object.hqId=this.hqId
    this.categoryService.add(object).subscribe({
      next: data=>{
        this.readCRUD(this.hqId)
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
        this.readCRUD(this.hqId)
      },
      error: error=>{
        this.showMessage.error({message: error.error.message, action:()=>this.updateCRUD(object)})
      }
    })

    return true;
  }

  readCRUD(hqId:number): boolean {
    this.isLoading=true;
    this.categoryService.allByHQ(hqId).subscribe({
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
        this.readCRUD(this.hqId);
      }, 
      error: error=>{
        this.showMessage.error({message: error.error.message})
      }
    })
    return true;
  }

  updSate=(catId:number, catState:number)=>{
    this.categoryService.updState(catId, catState).subscribe({
      next:e=>{
        this.showMessage.success({message: e.msg})
        this.readCRUD(this.hqId);

      }, error: e=>{
        this.showMessage.error({message: e.error.message})
      }
    
    })
  }

}



