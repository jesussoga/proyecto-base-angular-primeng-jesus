import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageUsuariosComponent } from './page-usuarios/page-usuarios.component';
import {PrimengModule} from "../primeng/primeng.module";
import {ReactiveFormsModule} from "@angular/forms";
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { HomeUsuariosComponent } from './components/home-usuarios/home-usuarios.component';
import {UsuarioRoutingModule} from "./usuario-routing.module";



@NgModule({
  declarations: [
    PageUsuariosComponent,
    EstadisticasComponent,
    HomeUsuariosComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    ReactiveFormsModule,
    UsuarioRoutingModule
  ]
})
export class UsuariosModule { }
