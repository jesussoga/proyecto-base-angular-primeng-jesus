import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InicioComponent} from "./shared/inicio/inicio.component";
import {PageCentralesComponent} from "./centrales/page-centrales/page-centrales.component";
import {PageUsuariosComponent} from "./usuarios/page-usuarios/page-usuarios.component";

const routes: Routes = [
  {path: "", component: InicioComponent, pathMatch: "full"},
  {path: "centrales", component: PageCentralesComponent},
  {path: "usuarios", component: PageUsuariosComponent},
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
