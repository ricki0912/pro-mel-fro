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


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, CrudInterface, ActionDialogInterface {

  constructor(
    public dialogEditUser: MatDialog,
    private categoryService: CategoryService,
    private loadingService: LoadingService
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

  createCRUD(object: any): boolean {
    return true;
  }

  readCRUD(): boolean {
    console.log("hoLA ESTAS ")
    this.categoryService.all().subscribe({
      complete: () => { },
      next: (r: Category[]) => {

        this.dataSource.data = CategoryHelpers.convertTableToTree(r)
        console.log(this.dataSource.data);
      },
      error: () => { }
    });

    return true
  }

  updateCRUD(id: string | number | null, object: any): boolean {
    return true;
  }
  deleteCRUD(ids: string | number | number[] | string[] | null): boolean {
    return true;
  }

  openDialogAdd(): boolean {

    console.log()
    const dialogRef = this.dialogEditUser.open(EditComponent, {
      /*maxWidth: '100vw',
       maxHeight: '100vh',
       height: '100%',
       width: '100%',*/
      panelClass: 'dialog',
      data: []
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    });
    return true
  }

  openDialogUpd(): boolean {


    return true;
  }

  openDialogdAddAndUpd(): boolean {
    return true;
  }

  openDialogAddToOne = (data: FlatTreeControlCategory) => {
    data.catName = "HOla"
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
        type: TYPES_ACTIONS_DIALOG.UPD
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    });
  }
}

