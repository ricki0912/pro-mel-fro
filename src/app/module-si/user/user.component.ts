import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatDialog} from '@angular/material/dialog';

import { EditComponent } from './pages/edit/edit.component';
import { MatSelectionList } from '@angular/material/list';
import {Location} from '@angular/common'; 
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CrudInterface } from 'src/app/global/interfaces/crud.interface';
import { User } from 'src/app/interfaces/user';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit,  CrudInterface {
  
  isLoading = true;

  
  
  

  constructor(
    private userService: UserService, 
    public dialogEditUser: MatDialog,
    private location: Location,
    private activatedRoute: ActivatedRoute) {

   }



  openDialogEditUser(){
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
    /*this.activatedRoute.params.subscribe((params)=>{
      console.log(params.indicator);
      this.loadRoue(params.indicator);
      this.indicatorTitle=this.indicatorTypes.find(e=>e.path==params.indicator)?.name;
    })*/
    this.readCRUD()
  }


  /*loadRoue(indicator:string){
    //console.log(Object.getPrototypeOf(indicatorSelect)); // true
    
    //console.log(this.location.path());

    this.service.all(indicator).subscribe((r:IndicatorSettings[])=> {
      //this.indicatorSettings=r
      this.isLoading = false;
      this.dataSource.data = r;
    }, error=>this.isLoading=false
    ) 
  }*/

  /*load(indicatorSelect:MatSelectionList){
    console.log(Object.getPrototypeOf(indicatorSelect)); // true
    
    console.log(this.location.path());

    this.service.all(indicatorSelect.selectedOptions.selected[0]?.value).subscribe((r:IndicatorSettings[])=> {
  
      this.isLoading = false;
      this.dataSource.data = r;
    }, error=>this.isLoading=false
    )
  }
*/
  displayedColumns: string[] = ['select','position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<User>();

  selection = new SelectionModel<User>(true, []);
    
  clickedRows = new Set<User>();
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      //console.log(numSelected, numRows);
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
  
      this.selection.select(...this.dataSource.data);
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: User): string {
      //console.log(this.selection.selected)
      if (!row) {
        //console.log(`${this.isAllSelected() ? 'deselect' : 'select'} all`);
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }else{
      //return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
      //console.log(`${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${ row.ID}`)
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${ row.id}`;
      }
      
    }

    del(){
      let ids=this.selection.selected.reduce((a:number[], b:User)=>(b.id==null)?a:[...a,b.id],[])
      console.log(ids)
      this.userService.del(ids)?.subscribe
      //this.service.del('type-work', ids)
    }

  createCRUD(object: any): boolean {
  return  false;
  }
  readCRUD(): boolean {
    this.isLoading=true;
    this.userService.all()?.subscribe({
      next:data=>{
        console.log(data);
        this.dataSource.data = data;
        this.isLoading=false

      }, 
      error:error=>{
        this.isLoading=false
      }
      
    })
    return false;
  }
  deleteCRUD(ids: string | number | string[] | number[] | null): boolean {
    return false
  }
  updateCRUD(id: string | number | null, object: any): boolean {
    return false;
  }





}



