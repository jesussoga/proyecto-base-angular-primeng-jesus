import {Component, OnInit} from '@angular/core';
import {Usuario} from "../../shared/models/usuario.model";
import {UsuarioService} from "../../shared/service/usuario.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ConfirmationService, Message, MessageService, PrimeIcons} from "primeng/api";
import {Rol} from "../../shared/models/rol.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-page-usuarios',
  templateUrl: './page-usuarios.component.html',
  styleUrls: ['./page-usuarios.component.css'],
  providers: [
    MessageService,
    ConfirmationService
  ]
})
export class PageUsuariosComponent implements OnInit{

    // Datos
  public usuarios: Usuario[];
  public roles: Rol[];
    // Variables de estado de un proceso
  public cargandoUsuarios: boolean;
  public borrandoUsuario: boolean;
  public guardandoUsuario: boolean;
  public estoyEditando: boolean;
    // Ventana de diálogo de un nuevo usuario
  public dialogoNuevoUsuarioVisible:  boolean;
  // Formulario Usuario
  public formUsuario!: FormGroup;
  public idUsuarioEditar: number;
  public ocultarPruebasDesarrolo: boolean;

  constructor(private usuarioService: UsuarioService,
              private mensajesService: MessageService,
              private confirmarService: ConfirmationService,
              private formBuilder: FormBuilder,
  ) {
    this.usuarios = [];
    this.roles = [
      {id: 1, rol: 'administrador'},
      {id: 2, rol: 'usuario'},
      {id: 3, rol: 'visor'}
    ];
    this.cargandoUsuarios = false;
    this.borrandoUsuario = false;
    this.guardandoUsuario= false;
    this.dialogoNuevoUsuarioVisible = false;
    this.ocultarPruebasDesarrolo = true;
    this.estoyEditando = false;
    this.idUsuarioEditar = 0;
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.cargarUsuarios();
  }

  public inicializarFormulario(){
    const regexEmail: string = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
    const claveDigitoMax: number = 8;
    const regexClave: string = `^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{${claveDigitoMax},}$`;
    this.formUsuario = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      correo: ["", [Validators.required, Validators.pattern(regexEmail)]],
      clave:  ["", [Validators.required, Validators.pattern(regexClave)]],
      rol:    ["", [Validators.required]]
    })
  }

  public cargarUsuarios(){
    this.cargandoUsuarios = true;
    this.usuarioService.obtenerTodosUsuarios().subscribe(
      {
        next: (datos: Usuario[]) => {
          this.usuarios = datos;
          console.log("Han llegado los datos ", datos);
          this.cargandoUsuarios = false;
        },
        error: (datos: HttpErrorResponse) => {
          console.log("Error al recuperar los datos", datos);
          this.cargandoUsuarios = false;
        }
      }
    );
  }

  public obtenerEstiloRol(rol: string): string{
    switch (rol){
      case 'administrador':
        return "success";
      case 'usuario':
        return "primary";
      case 'visor':
        return "warning";
      default:
        return "info";

    }
  }

  public borrarUsuario (usuario: Usuario){
    if (this.borrandoUsuario){
      return
    }
    this.borrandoUsuario = true;
    this.usuarioService.borrarUsuario(usuario).subscribe(
      {
        next: () => {
          const  mensaje: Message = {
            summary: "Borrar",
            detail: `Usuario '${usuario.nombre}' borrado satisfactoriamente`,
            severity: "success"
          };
          this.mensajesService.add(mensaje);
          this.borrandoUsuario = false;
          this.cargarUsuarios();
        },
        error: (datos: HttpErrorResponse) => {
          const  mensaje: Message = {
            summary: "Borrar",
            detail: "Hubo un error al borrar. " + datos.message,
            severity: "error"
          };
          this.borrandoUsuario = false;
          this.mensajesService.add(mensaje);        }
      }
    );
  }

  public confirmarBorrar(usuario: Usuario, evento: Event) {
      this.confirmarService.confirm({
        target: evento.target as EventTarget,
        message: `¿Deseas borrar a '${usuario.nombre}'?`,
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Borrar',
        rejectLabel: 'Cancelar',
        accept: () => {
          this.borrarUsuario(usuario);
          },
        reject: () => {
          this.mensajesService.add({ severity: 'info', summary: 'Cancelado', detail: 'No se ha borrado nada' });
        }
      });
  }

  public mostrarDialogoUsuario(usuarioEditar? : Usuario ) {
    this.estoyEditando = usuarioEditar! != undefined;

    // Guardamos la id del usuario que queramos editar, para usarla despues en el servicio.
    if (this.estoyEditando){
      if(usuarioEditar!.id != undefined){
        this.idUsuarioEditar = usuarioEditar!.id;
      }
      this.formUsuario.reset(usuarioEditar);
    } else {
      this.formUsuario.reset(); //TODO cuando estemos editando no lo resetearemos;
    }
    this.dialogoNuevoUsuarioVisible = true;
  }
  public ocultarDialogoUsuario(){
    this.dialogoNuevoUsuarioVisible = false;
  }

 public validarFormulario() {

    let usuario: Usuario = this.formUsuario.value;
    // Así se añaden atributos a un JSON..
    usuario = {... usuario, admin: usuario.rol.id == 1}; // El rol con id 1 es administrador

    // Así se eliminan atributos a un JSON..
    // delete usuario.admin
    if(this.estoyEditando){
      usuario = {... usuario, id: this.idUsuarioEditar}; // El rol con id 1 es administrador

      this.modificarUsuario(usuario);
    } else {
      this.guardarUsuarioValidado(usuario);
    }
    this.cargarUsuarios();
  }

  public guardarUsuarioValidado(usuario: Usuario){
    this.guardandoUsuario = true;
    this.usuarioService.guardarUsuario(usuario).subscribe(
      {
        next: () => {
          this.mensajesService.add({
            summary: "Nuevo usuario",
            detail: "Se ha guardado satisfactoriamente el usuario",
            severity: "success",
            icon: "pi pi-user-plus"
          });
        },
        error: (datos: HttpErrorResponse) => {
          this.mensajesService.add({
            summary: "Nuevo usuario",
            detail: "Ha habido un error " +  datos.message,
            severity: "error",
            icon: "pi pi-user-plus"
          });
        },
        complete: () => {
          this.guardandoUsuario = false;
          this.ocultarDialogoUsuario();
        }
      }
    );
  }

  public esCampoInvalido(campo: string) {
    return this.formUsuario.controls[campo].invalid && this.formUsuario.controls[campo].touched;
  }

  public marcarTodosLosCampos() {
    this.formUsuario.markAllAsTouched();
  }

  public modificarUsuario(usuario: Usuario) {
    this.guardandoUsuario = true;
    this.usuarioService.editarUsuario(usuario).subscribe(
      {
      next: (datos: Usuario) => {
        this.mensajesService.add({
          summary: "Editar",
          detail: "Usuario actualizado correctamente",
          severity: "success",
        })
      },
      error: (error: HttpErrorResponse) => {
        this.mensajesService.add({
          summary: "Editar",
          detail: `Error al editar   ${error.message}`,
          severity: "warm"
        });
      },
        complete: () => {
          this.guardandoUsuario = false;
          this.ocultarDialogoUsuario();
        }
    });
  }
}
