
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout'
import {
  AbstractControl, FormBuilder, ValidationErrors, AsyncValidatorFn,
  FormControl, FormGroup, Validators
} from '@angular/forms';
//import {Observable} from "rxjs/Observable";

import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Category, FlatTreeControlCategory } from 'src/app/interfaces/category';
import { CategoryService } from '../../../../services/category.service'
import { FindCategoryComponent } from '../find-category/find-category.component';
import { catchError, delay, map } from 'rxjs/operators';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy {

  category: Category = {
    catName: '',
  };

  flatTreeControlCategory?: FlatTreeControlCategory;

  categoryForm: FormGroup = this.fb.group({
    catCode: ['', {
      validators: [Validators.required],
      asyncValidators: this.validateBusiness.bind(this),
      updateOn: 'blur',
    }],
    catName: ['', Validators.required],
    catNameLong: [],
    catDescription: [],
  })

  constructor(
    public mediaObserver: MediaObserver,
    private categoryService: CategoryService,
    public dialogFindCategory: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { row: FlatTreeControlCategory, type: Number },
    private fb: FormBuilder,
    public snackBar: MatSnackBar) {

    console.log(data.row)
    //this.grid.cols=1

  }

  openSnackBar(message: string, action: string, className: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      panelClass: [className]
    });
  }

  selectCategory = (row: FlatTreeControlCategory) => {
    this.flatTreeControlCategory = row;
    this.category.catNameLong = this.flatTreeControlCategory.catNameLong;
    this.category.catIdParent = this.flatTreeControlCategory.catId;
    //this.categoryForm.patchValue({catNameLong: this.flatTreeControlCategory.catNameLong})
    this.categoryForm.controls['catNameLong'].setValue(this.flatTreeControlCategory.catNameLong)

  }


  validateBusiness(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // console.log(control)
        if (control.value !== 'HOLA') {
          resolve(null);
        }
        else {
          resolve({ existValue: 'ERROR...' });
        }
      },
        1000);
    });
  }


  hasErrorFormCategory = (cf: string, nameError: string) => this.categoryForm.controls[cf].hasError(nameError);


  cols: number = 1;

  gridByBreakpoint: GridResponsive = {
    xl: 2,
    lg: 2,
    md: 2,
    sm: 2,
    xs: 1
  }

  openDialogFindCategory = () => {

    const dialogRefFindCategory = this.dialogFindCategory.open(FindCategoryComponent, {
      /*maxWidth: '100vw',
       maxHeight: '100vh',
       height: '100%',
       width: '100%',*/
      panelClass: 'dialog',
      data: {
        row: this.flatTreeControlCategory,
        type: 1
      }
    });
    dialogRefFindCategory.afterClosed().subscribe(result => {
      this.selectCategory(result.row)

      console.log(`Dialog result: ${result}`, result)
    });
  }

  mediaSub!: Subscription;


  ngOnInit(): void {
    this.renderScreen()
    this.selectCategory(this.data.row)
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }

  save(): void {

  }

  renderScreen = (): void => {

    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      let mqAlias: string = String(result.mqAlias);
      this.cols = this.gridByBreakpoint[mqAlias];

    })
  }


  add(categoryObject: Category) {
    //console.log(this.categoryForm)
    //console.log(categoryObject)

    //console.log(categoryObject);

    /*console.log(Object.getPrototypeOf(indicator)); // true    */
    this.categoryService.add(categoryObject).subscribe(
      (r: any) => { console.log(r) },
      (e: any) => {
        console.log(e)
      }
    );

    /*
    add(categoryObject).subscribe({
      complete:()=>{},
      next: (r:Category[])=>{
        
        this.dataSource.data=CategoryHelpers.convertTableToTree(r)
        console.log(this.dataSource.data);
      },
      error: ()=>{}
   });*/

  }


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