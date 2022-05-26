import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActionDialogInterface, TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { CrudInterface } from 'src/app/global/interfaces/crud.interface';
import { Services } from 'src/app/interfaces/services';
import { ServicesService } from 'src/app/services/services.service';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { EditServiceComponent } from './pages/edit-service/edit-service.component';

@Component({
  selector: 'app-md-services',
  templateUrl: './md-services.component.html',
  styleUrls: ['./md-services.component.scss']
})

export class MdServicesComponent implements OnInit, CrudInterface, ActionDialogInterface {

  isLoading = true;
  constructor(
    private serviceService: ServicesService,
    public dialogEditService: MatDialog,
    private showMessage: ShowMessageService
  ) { }

  ngOnInit(): void {
    this.readCRUD();
  }

  displayedColumns: string[] = ['select','name', 'state'];
  dataSource = new MatTableDataSource<Services>();
  selection = new SelectionModel<Services>(true, []);

  clickedRows = new Set<Services>();

  //para el paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
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
  checkboxLabel(row?: Services): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.svId}`;
  }

  createCRUD(object: any): boolean {
    throw new Error('Method not implemented.');
  }

  readCRUD(): boolean {
    this.isLoading = true;
    this.serviceService.all()?.subscribe({
      next: data => {
        this.dataSource.data = data;
        this.isLoading = false
      },
      error: error => {
        this.isLoading = false
      }
    })
    return false;
  }
  updateCRUD(object: any, id: string | number | null): boolean {
    throw new Error('Method not implemented.');
  }

  deleteCRUD(id: number[]): boolean {
    this.serviceService.delServices(id).subscribe({
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

  openDialogAdd(): boolean {
    const dialogRef = this.dialogEditService.open(EditServiceComponent, {
      panelClass: 'dialog',
      data: {
        row: {},
        type: TYPES_ACTIONS_DIALOG.ADD
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addServices(result);
      }
    });
    return true
  }
  openDialogUpd(): boolean {
    let ids = this.selection.selected.reduce((a: number[], b: Services) => (b.svId == null) ? a : [...a, b.svId], [])
    let serviceSelected : Services = this.selection.selected.filter(o => o.svId == ids[0])[0];
    const dialogRef = this.dialogEditService.open(EditServiceComponent, {
      panelClass: 'dialog',
      data: {
        row: serviceSelected,
        type: TYPES_ACTIONS_DIALOG.UPD
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.updServices(result);
      }
    });
    return false;
  }
  openDialogdAddAndUpd(object: any): boolean {
    throw new Error('Method not implemented.');
  }

  //FUNCIONES
  addServices(services: Services): boolean {
    this.serviceService.addServices(services).subscribe({
      next: data => {
        this.showMessage.success({ message: data.msg });
        const service = data.data as Services[];
        this.dataSource.data.unshift(...service);
        this.paginator._changePageSize(this.paginator.pageSize);
      },
      error: error => {
        this.showMessage.error({ message: error.error.message, action: () => this.addServices(services) });
      }
    });
    return true;
  }

  updServices(services: Services): boolean {
    this.serviceService.updServices(services).subscribe({
      next: data => {
        this.showMessage.success({ message: data.msg });
        const service = data.data as Services[];
        const objIndex = this.dataSource.data.findIndex((obj => obj.svId == service[0].svId));
        this.dataSource.data[objIndex] = service[0];
        this.selection.clear();
        this.paginator._changePageSize(this.paginator.pageSize);
      },
      error: error => {
        this.showMessage.error({ message: error.error.message, action: () => this.updServices(services) });
      }
    });
    return true;
  }

  delServices(){
    let ids = this.selection.selected.reduce((a: number[], b: Services) => (b.svId == null) ? a : [...a, b.svId], []);
    this.wantDelete(()=>this.deleteCRUD(ids))
  }

  wantDelete(d:()=>void){
    this.dialogEditService
      .open(DialogConfirmationComponent, {
        data: `Esta seguro que desea Eliminar.`,
      })
      .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          d();
        } else {

        }
      });
  }

  enableDisableServices(id: number[]):boolean{
    this.serviceService.enableDisableServices(id).subscribe({
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
