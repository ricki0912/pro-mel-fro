import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { VideosService } from 'src/app/services/videos.service';
import { Videos } from 'src/app/interfaces/videos';
import { CrudInterface } from 'src/app/global/interfaces/crud.interface';

import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditVideoComponent } from './pages/edit-video/edit-video.component';
import { ActionDialogInterface, TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { DialogConfirmationComponent } from 'src/app/shared/components/dialog-confirmation/dialog-confirmation.component';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit, CrudInterface, ActionDialogInterface {
  isLoading = true;

  constructor(
    private videosService: VideosService,
    public dialogEditVideo: MatDialog,
    private showMessage: ShowMessageService
  ) { }

  ngOnInit(): void {
    this.readCRUD();
  }

  displayedColumns: string[] = ['select','nombres', 'link', 'state'];
  dataSource = new MatTableDataSource<Videos>();
  selection = new SelectionModel<Videos>(true, []);

  clickedRows = new Set<Videos>();

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
  checkboxLabel(row?: Videos): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.vidId}`;
  }

  //CRUD
  createCRUD(object: any): boolean {
    throw new Error('Method not implemented.');
  }

  readCRUD(): boolean {
    this.isLoading = true;
    this.videosService.all()?.subscribe({
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

  openDialogAdd(): boolean {
    const dialogRef = this.dialogEditVideo.open(EditVideoComponent, {
      panelClass: 'dialog',
      data: {
        row: {},
        type: TYPES_ACTIONS_DIALOG.ADD
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addVideos(result);
      }
    });
    return true
  }
  openDialogUpd(): boolean {
    let ids = this.selection.selected.reduce((a: number[], b: Videos) => (b.vidId == null) ? a : [...a, b.vidId], [])
    let videoSelected : Videos = this.selection.selected.filter(o => o.vidId == ids[0])[0];
    const dialogRef = this.dialogEditVideo.open(EditVideoComponent, {
      panelClass: 'dialog',
      data: {
        row: videoSelected,
        type: TYPES_ACTIONS_DIALOG.UPD
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.updVideos(result);
      }
    });
    return false;
  }

  openDialogdAddAndUpd(object: any): boolean {
    throw new Error('Method not implemented.');
  }

  //FUNCIONES
  addVideos(videos: Videos): boolean {
    this.videosService.addVideos(videos).subscribe({
      next: data => {
        /**mostramos un mensaje de exito */
        this.showMessage.success({ message: data.msg });
        /*obtenemos el ultimo business devuelto por el backend y que viene en data */
        const videos = data.data as Videos[]

        /*El nuevo usuario lo añadimos a la primera fila de la tabla */
        this.dataSource.data.unshift(...videos)
        /**actualizamops paginator */
        this.paginator._changePageSize(this.paginator.pageSize)
      },
      error: error => {
        /**Mostramos un mensaje de error y pasamos una funcion para reintenar nuevamente añdir el usuario  */
        this.showMessage.error({ message: error.error.message, action: () => this.addVideos(videos) })
      }
    });
    return true;
  }

  updVideos(videos: Videos): boolean {
    this.videosService.updVideos(videos).subscribe({
      next: data => {

        this.showMessage.success({ message: data.msg });
        const videos = data.data as Videos[];
        const objIndex = this.dataSource.data.findIndex((obj => obj.vidId == videos[0].vidId));
        this.dataSource.data[objIndex] = videos[0];
        this.selection.clear();
        this.paginator._changePageSize(this.paginator.pageSize);
      },
      error: error => {
        this.showMessage.error({ message: error.error.message, action: () => this.updVideos(videos) });
      }
    });
    return true;
  }

  delVideos(){
    let ids = this.selection.selected.reduce((a: number[], b: Videos) => (b.vidId == null) ? a : [...a, b.vidId], []);
    this.wantDelete(()=>this.deleteCRUD(ids))
  }

  wantDelete(d:()=>void){
    this.dialogEditVideo
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

  deleteCRUD(id: number[]): boolean {
    this.videosService.delVideos(id).subscribe({
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

  enableDisableVideos(id: number[]):boolean{
    this.videosService.enableDisableVideos(id).subscribe({
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
