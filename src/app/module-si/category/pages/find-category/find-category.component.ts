import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout'
import { Subscription } from 'rxjs';
import { Category, CategoryTree, FlatTreeControlCategory } from 'src/app/interfaces/category';
import { CategoryService } from '../../../../services/category.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CategoryHelpers } from '../../../../global/helpers/category.helpers';
import { MainViewService } from 'src/app/module-si/main-view/main-view.service';


@Component({
  selector: 'app-find-category',
  templateUrl: './find-category.component.html',
  styleUrls: ['./find-category.component.scss']
})
export class FindCategoryComponent implements OnInit, OnDestroy {
  hqId:number=0
  /**guardar el id ultimo  */
  catIdSelected = -1;
  flatTreeControlCategory?: FlatTreeControlCategory;

  cols: number = 1;
  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }

  mediaSub!: Subscription;
  constructor(
    public mediaObserver: MediaObserver,
    private categoryService: CategoryService,
    private mainViewService:MainViewService,
    private dialogRef: MatDialogRef<FindCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { row: FlatTreeControlCategory, type: Number, hqId:number }
  ) {
  }

  ngOnInit(): void {
    this.selectCategory(this.data.row);
    this.showData(this.data.hqId)
    //this.listenRoute(o=>this.showData(o))
  }


  ngOnDestroy(): void {
    //this.mediaSub.unsubscribe();

  }


  selectCategory = (row: FlatTreeControlCategory) => {
    this.flatTreeControlCategory = row;
    /*this.category.catNameLong=row.catNameLong;
    /*this.category.catIdParent=row.catId;*/
  }


  /**para cerrar y volver al modal anterior */
  onReturn = (): void => this.dialogRef.close(this.flatTreeControlCategory);

  /**para ver si tiene hijos no no  */

  //conexion a services para mostarar informacion 
  showData = (hqId:number) => {
    this.categoryService.allByHQ(hqId).subscribe({
      complete: () => { },
      next: (r: Category[]) => {
        this.dataSource.data = CategoryHelpers.convertTableToTree(r, undefined);
      },
      error: () => { }
    });
  }

  //*es para rederizar la pantalla, aqui no se esta haciendo eso 
  renderScreen = (): void => {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      console.log(result.mqAlias)
      let mqAlias: string = String(result.mqAlias);
      this.cols = this.gridByBreakpoint[mqAlias];

    })
  }


  displayedColumns: string[] = ['catName', 'catCode'];

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

  setFlatTreeControlCategory = (data: FlatTreeControlCategory) => {
    this.flatTreeControlCategory = data

  }

}

/**Esto es para crear grillas en las vistar, aqui no se utiliza */
interface GridResponsive {

  [key: string]: number
}









