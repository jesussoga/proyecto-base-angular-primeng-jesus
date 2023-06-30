import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeUsuariosComponent} from "./components/home-usuarios/home-usuarios.component";
import {PageUsuariosComponent} from "./page-usuarios/page-usuarios.component";
import {EstadisticasComponent} from "./components/estadisticas/estadisticas.component";

const rutas: Routes = [
  {
    path: '',
    children: [
      {path: "", component: HomeUsuariosComponent, pathMatch: "full"},
      {path: "listados", component: PageUsuariosComponent},
      {path: "estadisticas", component: EstadisticasComponent},
      {path: "**", redirectTo: ""}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(rutas)],
})
export class UsuarioRoutingModule { }
