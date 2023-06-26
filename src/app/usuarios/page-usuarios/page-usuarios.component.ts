import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../shared/models/usuario.model";
import {UsuarioService} from "../../shared/service/usuario.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-page-usuarios',
  templateUrl: './page-usuarios.component.html',
  styleUrls: ['./page-usuarios.component.css']
})
export class PageUsuariosComponent implements OnInit{

  constructor(private usuarioService: UsuarioService) {
  }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  public cargarUsuarios(){
    this.usuarioService.obtenerTodosUsuarios().subscribe(
      {
        next: (datos: Usuario[]) => {
          console.log("Han llegado los datos ", datos);
        },
        error: (datos: HttpErrorResponse) => {
          console.log("Error al recuperar los datos", datos);
        }
      }
    );
  }

}
