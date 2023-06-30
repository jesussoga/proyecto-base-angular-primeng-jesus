import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InicioComponent} from "./shared/inicio/inicio.component";
import {PageCentralesComponent} from "./centrales/page-centrales/page-centrales.component";

const routes: Routes = [
  {path: "", component: InicioComponent, pathMatch: "full"},
  {path: "centrales", component: PageCentralesComponent},
  {path: "usuarios", loadChildren: () => import("./usuarios/usuarios.module").then(m => m.UsuariosModule) },
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
