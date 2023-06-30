import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { PageCentralesComponent } from './centrales/page-centrales/page-centrales.component';
import {UsuariosModule} from "./usuarios/usuarios.module";
import {SharedModule} from "./shared/shared.module";
import {CentralesModule} from "./centrales/centrales.module";
import {UsuarioRoutingModule} from "./usuarios/usuario-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    PageCentralesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UsuariosModule,
    SharedModule,
    UsuariosModule,
    CentralesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
