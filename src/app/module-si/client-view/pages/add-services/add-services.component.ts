import { Component, Host, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SatPopover } from '@ncstate/sat-popover';
import { filter } from 'rxjs/operators';
import { CrudInterface } from 'src/app/global/interfaces/crud.interface';
import { Services } from 'src/app/interfaces/services';
import { ServicesService } from 'src/app/services/services.service';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';

@Component({
  selector: 'app-add-services',
  styleUrls: ['./add-services.component.scss'],
  template: `
    <form [formGroup]="svForm">
      <div class="mat-subheading-2">Agregar Servicio</div>
      <mat-form-field appearance="fill">
        <mat-label>Servicio</mat-label>
        <mat-select formControlName="name">
          <mat-option *ngFor="let sv of listServ" [value]="sv.svId">
            {{ sv.svName }}
          </mat-option>
        </mat-select>
        <mat-error> EL servicio es requerido. </mat-error>
      </mat-form-field>
      <div class="actions">
        <button mat-button type="button" color="primary" (click)="onCancel()">Cancelar</button>
        <button mat-button type="submit" [disabled]="!svForm.valid" (click)="addSv()" color="primary">Listo</button>
      </div>
    </form>
  `
})
export class AddServicesComponent implements OnInit, CrudInterface {

  listServ: Services[]=[];

  /** Overrides the comment and provides a reset value when changes are cancelled. */
  @Input()
  get value(): string { return this._value; }
  set value(x: string) {
    this.sv = this._value = x;
  }
  private _value = '';

  /** Form model for the input. */
  sv = '';

  constructor(
    @Optional() @Host() 
    public popover: SatPopover, 
    private fb: FormBuilder,
    private serviceService: ServicesService,
    private showMessage: ShowMessageService
  ) { }

  svForm: FormGroup = this.fb.group({
    name : ['',Validators.required],
  });

  ngOnInit() {
    // subscribe to cancellations and reset form value
    if (this.popover) {
      this.popover.closed.pipe(filter(val => val == null))
        .subscribe(() => this.sv = this.value || '');
    }
    this.readCRUD();
  }

  createCRUD(): boolean {
    throw new Error('Method not implemented.');
  }
  readCRUD(): boolean {
    this.serviceService.all()?.subscribe({
      next: data => {        
        this.listServ = data;
      },
      error: e => {
        this.showMessage.error({message: e.error.message});
      }
    })
    return false;
  }
  updateCRUD(object: any, id: string | number | null): boolean {
    throw new Error('Method not implemented.');
  }
  deleteCRUD(ids: string | number | string[] | number[] | null): boolean {
    throw new Error('Method not implemented.');
  }


//Funciones
  addSv() {
    if (this.popover) {
      this.popover.close(this.svForm.value);
    }
  }

  onCancel() {
    if (this.popover) {
      this.popover.close('hide');
    }
  }

  /*services: Services[] = [
    {value: '1', name: 'Declaracion Jurada'},
    {value: '2', name: 'Concecionarias'},
    {value: '3', name: 'Otros'},
  ];*/

}

/*interface Services {
  value: string;
  name: string;
}*/
