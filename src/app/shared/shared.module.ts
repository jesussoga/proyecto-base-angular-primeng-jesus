import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { InicioComponent } from './inicio/inicio.component';
import {HttpClientModule} from "@angular/common/http";
import {PrimengModule} from "../primeng/primeng.module";



@NgModule({
  declarations: [
    NavComponent,
    InicioComponent
  ],
  exports: [
    NavComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    HttpClientModule,
  ]
})
export class SharedModule { }
