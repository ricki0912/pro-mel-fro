import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulePrintServerRoutingModule } from './module-print-server-routing.module';
import { PrintServerComponent } from './print-server/print-server.component';
import { PrintingCardComponent } from './print-server/pages/printing-card/printing-card.component';


@NgModule({
  declarations: [
    PrintServerComponent,
    PrintingCardComponent
  ],
  imports: [
    CommonModule,
    ModulePrintServerRoutingModule
  ]
})
export class ModulePrintServerModule { }
