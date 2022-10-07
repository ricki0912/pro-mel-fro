import { Component, Host, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { SatPopover } from '@ncstate/sat-popover';
import { ReplaySubject, Subject } from 'rxjs';
import { filter, find, take, takeUntil } from 'rxjs/operators';
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
      <mat-form-field appearance="fill" >

      <mat-label>Servicio</mat-label>
      <mat-select formControlName="name" [formControl]="listServCtrl" placeholder="Ej. mensual" #singleSelect>
        <mat-option>
          <ngx-mat-select-search [formControl]="listServFilterCtrl" 
            placeholderLabel="Busca un servicio"
            noEntriesFoundLabel="'No hay coincidencias'"
          ></ngx-mat-select-search>
        </mat-option>
          <mat-option  *ngFor="let sv of filteredListServ | async" [value]="sv.svId">
            {{ sv.svName }}
          </mat-option>
        </mat-select>
        <mat-error> EL servicio es requerido. </mat-error>

      </mat-form-field>
      <!--Selected Bank: {{listServCtrl.value | json}}-->

    

      <div class="actions">
        <button mat-button type="button" color="primary" (click)="onCancel()">Cancelar</button>
        <button mat-button type="submit" [disabled]="!listServCtrl.value" (click)="addSv()" color="primary">Listo</button>
      </div>
    </form>
  `
})
export class AddServicesComponent implements OnInit {
  @Input() listServ: Services[]=[];

  /** Overrides the comment and provides a reset value when changes are cancelled. */
  @Input()
  get value(): string { return this._value; }
  set value(x: string) {
    this.sv = this._value = x;
  }
  private _value = '';

  /** Form model for the input. */
  sv = '';


  /** control for the selected bank */
  public listServCtrl: FormControl = new FormControl();

  /** control for the MatSelect filter keyword */
  public listServFilterCtrl: FormControl = new FormControl();

  /** list of banks filtered by search keyword */
  public filteredListServ: ReplaySubject<Services[]> = new ReplaySubject<Services[]>(1);

  @ViewChild('singleSelect') singleSelect?: MatSelect;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  constructor(
    @Optional() @Host() 
    public popover: SatPopover, 
    private fb: FormBuilder,
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
    //this.svForm.controls['name'].setValue(this.value);

        // set initial selection

        // load the initial bank list
        this.listServCtrl.setValue(parseInt(this.sv));
        //this.listServCtrl.setValue(this.listServ.find(e=>e.svId==parseInt(this.sv)));

        this.filteredListServ.next(this.listServ.slice());

    
        // listen for search field value changes
        this.listServFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterBanks();
          });
  }

  addSv() {
    
    if (this.popover) {
      
      this.popover.close({name:this.listServCtrl.value });
      //this.popover.close(this.svForm.value);
    }
  }

  onCancel() {
    if (this.popover) {
      this.popover.close();
    }
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
  protected setInitialValue() {
    this.filteredListServ
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        if(this.singleSelect)
        this.singleSelect.compareWith = (a:number, b: number) => a=== b;

        //this.singleSelect.compareWith = (a:Services, b: Services) => a && b && a.svId === b.svId;
      });
  }

  protected filterBanks() {
    if (!this.listServ) {
      return;
    }
    // get the search keyword
    let search = this.listServFilterCtrl.value;
    if (!search) {
      this.filteredListServ.next(this.listServ.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredListServ.next(
      this.listServ.filter(s => (s.svName || '').toLowerCase().indexOf(search) > -1)
    );
  }









 


 


}

