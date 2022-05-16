
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout'
import {
  AbstractControl, FormBuilder, ValidationErrors, AsyncValidatorFn,
  FormControl, FormGroup, Validators
} from '@angular/forms';
//import {Observable} from "rxjs/Observable";

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Category, FlatTreeControlCategory } from 'src/app/interfaces/category';
import { CategoryService } from '../../../../services/category.service'
import { FindCategoryComponent } from '../find-category/find-category.component';
import { catchError, delay, map } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TYPES_ACTIONS_DIALOG } from 'src/app/global/interfaces/action-dialog.interface';
import { ShowMessageService } from 'src/app/shared/components/show-message/show-message.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {
  title = "Añadir una categoria o sub categoria"
  categoryBeforeUpd: Category = {
    catName: '',
  };

  flatTreeControlCategory?: FlatTreeControlCategory;


  categoryForm: FormGroup = this.fb.group({
    catName: ['', Validators.required],
    catCode: ['', {
      validators: [Validators.required],
      asyncValidators: this.validateCode.bind(this),
      updateOn: 'blur',
    }],
    catLinkBus:['2'/*no*/ , Validators.required],
    catAuth:['1'/*ninguno*/ , Validators.required],
    catNameLongParent: [],
    catDescription: [],
  })


  constructor(
    public mediaObserver: MediaObserver,
    private categoryService: CategoryService,
    public dialogFindCategory: MatDialog,
    @Inject(MAT_DIALOG_DATA) public paramsDialog: { row: FlatTreeControlCategory, rowParent: FlatTreeControlCategory, type: Number , hqId:number},
    private fb: FormBuilder,
    private showMessage: ShowMessageService,
    private dialogRef: MatDialogRef<EditComponent>,

  ) { }
  ngOnInit(): void {
    this.renderScreen()
    //this.selectCategory(this.paramsDialog.row)
    this.setTypeDialog()
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

  renderScreen = (): void => {
    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      let mqAlias: string = String(result.mqAlias);
      this.cols = this.gridByBreakpoint[mqAlias];
    })
  }

  setTypeDialog() {
    if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
      this.find(this.paramsDialog.row.catId, this.loadCategoryToUPdate)
    }

    if (TYPES_ACTIONS_DIALOG.ADD == this.paramsDialog.type) {
    }

    if (this.paramsDialog.rowParent) {
      this.showCategoryParent(this.paramsDialog.rowParent)
    }


  }
  loadCategoryToUPdate=(c: Category) =>{
    console.log("***LOADCATEGORYU*****", c)
    /**Asignamos la c a anterios */
    this.categoryBeforeUpd = c;
    
    /*show el titulo */
    this.title = this.categoryBeforeUpd.catName + '-' + this.categoryBeforeUpd.catCode || ''
    /* Renderizar categoria */
    this.categoryForm.controls['catName'].setValue(this.categoryBeforeUpd.catName)
    this.categoryForm.controls['catCode'].setValue(this.categoryBeforeUpd.catCode)
    this.categoryForm.controls['catDescription'].setValue(this.categoryBeforeUpd.catDescription)
    this.categoryForm.controls['catLinkBus'].setValue(this.categoryBeforeUpd.catLinkBus?.toString())
    this.categoryForm.controls['catAuth'].setValue(this.categoryBeforeUpd.catAuth?.toString())
    
    this.categoryForm.controls['catNameLongParent'].setValue(this.categoryBeforeUpd.catNameLong?.slice(0,-this.categoryBeforeUpd.catName.length) )

  }


  showCategoryParent = (r: FlatTreeControlCategory) => {
    this.flatTreeControlCategory = r;
    this.categoryBeforeUpd.catIdParent = this.flatTreeControlCategory.catId
    this.categoryBeforeUpd.catNameLong = this.flatTreeControlCategory.catNameLong;
    this.categoryForm.controls['catNameLongParent'].setValue(this.flatTreeControlCategory.catNameLong)
  }



  validateCode(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.categoryService.searchByCode(control.value).
      pipe(
        map((category: Category) => {
          if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
            if (!category) {
              return null;
            }
            if (this.categoryBeforeUpd?.catCode != category.catCode) {
              return { existCatCode: 'Este código ya esta en uso.' };
            }
            /**si el usuario devuelto es igual al actual retorna null */
            return null
          }
          return (!category) ? null : { existCatCode: 'Este código ya esta en uso.' }
        })
      )
  }




  hasErrorFormCategory = (cf: string, nameError: string) => this.categoryForm.controls[cf].hasError(nameError);


  cols: number = 2;

  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1 
  }

  openDialogFindCategory = () => {

    const dialogRefFindCategory = this.dialogFindCategory.open(FindCategoryComponent, {
      panelClass: 'dialog',
      data: {
        row: this.flatTreeControlCategory,
        type: 1,
        hqId:this.paramsDialog.hqId
      }
    });
    dialogRefFindCategory.afterClosed().subscribe((result: FlatTreeControlCategory) => {
     if(result){
        this.showCategoryParent(result)
     }
    });
  }

  mediaSub!: Subscription;



  save(): void {

  }

  /*se obtiene la categoria y mostarar en formulario */
  find(id: number | Number, lcbu: (c: Category)=>void) {
    this.categoryService.find(id as number).subscribe({
      next: (data: Category) => {
        console.log(data)
        lcbu(data)
      },
      error: error => {
        this.showMessage.error({ message: error.error.message });
      }
    });
  }

  onReturn = (category: Category): void => this.dialogRef.close(category);
  /*Prepara para guaarda y actualizar */
  addUpd() {
    if (TYPES_ACTIONS_DIALOG.UPD == this.paramsDialog.type) {
      this.upd();
    } else {
      this.add();
    }

  }
  add() {
    const categoryObject: Category = this.categoryForm.value;
    console.log("***ACTUALIZAR****+",categoryObject)
    if(this.flatTreeControlCategory){
      categoryObject.catIdParent=this.flatTreeControlCategory.catId  
    }
    
    this.onReturn(categoryObject);
  }
  upd() {
    const categoryObject: Category = this.categoryForm.value;
    categoryObject.catId = this.categoryBeforeUpd.catId;
    /*aqui agregamos el de la categoria paddre */
    categoryObject.catIdParent=(this.flatTreeControlCategory)
      ?this.flatTreeControlCategory.catId  
      :this.categoryBeforeUpd.catIdParent
    this.onReturn(categoryObject);
  }
  /** */

}

interface GridResponsive {
  [key: string]: number
}

/**
 *   personForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.personForm = this._formBuilder.group({
      firstName:  [ '', Validators.required ],
      lastName: [ '', Validators.required ],
    }, {
      asyncValidator: this.validateBusiness.bind(this)
    });
  }

  validateBusiness(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
          if (control.value.firstName !== control.value.lastName) {
            resolve(null);
          }
          else {
            resolve({sameValue: 'ERROR...'});
          }
        },
        1000);
    });
  }
 *
  https://github.com/thisiszoaib/angular-async-validation/blob/master/src/app/services/user.service.ts
 */