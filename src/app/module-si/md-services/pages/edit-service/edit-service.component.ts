import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { Services } from 'src/app/interfaces/services';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.scss']
})
export class EditServiceComponent implements OnInit, OnDestroy {

  title = 'Añadir un Servicio Nuevo';
  serviceBeforeUpd: Services | null = null;

  constructor(
    public mediaObserver: MediaObserver,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: Services, type: number },
    private dialogRef: MatDialogRef<EditServiceComponent>,
  ) { }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      let mqAlias: string = String(result.mqAlias);
      this.cols = this.gridByBreakpoint[mqAlias];
    })
    this.setTypeDialog();
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

  cols: number = 1;
  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }
  mediaSub!: Subscription;

  servicesForm: FormGroup = this.fb.group({
    svName : ['',Validators.required],
    svState : ['',Validators.required]
  });

  setTypeDialog() {
    if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
      this.serviceBeforeUpd = this.paramsDialog.row;
      this.title = this.serviceBeforeUpd.svName || ''

      this.servicesForm.get('svName')?.setValue(this.serviceBeforeUpd.svName);
      this.servicesForm.get('svState')?.setValue(this.serviceBeforeUpd.svState?.trim());
    }
  }

  onReturn = (services: Services): void => this.dialogRef.close(services);

  addServices(): boolean {
    const service: Services = this.servicesForm.value;
    this.onReturn(service);
    return true;
  }

  updServices(): boolean {
    const service: Services = this.servicesForm.value;
    service.svId = this.serviceBeforeUpd?.svId;
    this.onReturn(service);
    return true;
  }

  addUpdServices(): boolean{
    return (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) ?
    this.updServices():
    this.addServices();
  }
}

interface GridResponsive {
  [key: string]: number
}