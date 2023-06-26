import { NgModule } from '@angular/core';

import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {MenubarModule} from "primeng/menubar";
import {CardModule} from "primeng/card";
import {TableModule} from "primeng/table";



@NgModule({

  // Aquí solo exportaciones!!!!

  exports: [
    RippleModule,
    MenubarModule,
    ButtonModule,
    CardModule,
    TableModule
  ]


})
export class PrimengModule { }
