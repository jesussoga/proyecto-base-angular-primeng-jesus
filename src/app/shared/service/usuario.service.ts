import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "../models/usuario.model";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public url: string;

  constructor(private httpClient: HttpClient) {
    this.url = "http://localhost:3000";
  }

  public obtenerTodosUsuarios(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(this.url + "/usuarios");
  }

  public borrarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.httpClient.delete<Usuario>(`${this.url}/usuarios/${usuario.id}`);
  }

  public guardarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.httpClient.post<Usuario>(`${this.url}/usuarios`, usuario);
  }
}
