import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChronometerComponent } from './chronometer.component';



@NgModule({
  declarations: [ChronometerComponent],
  imports: [
    CommonModule
  ],
  exports:[ChronometerComponent]
})
export class ChronometerModule { }
