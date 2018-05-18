import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService, ModalUploadService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario= new Usuario('', '', '', '', '', '', '', 0);
  imagenSubir: File;
  imagenTemp: string;
  esNuevo: boolean = false;
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public _modalUploadService: ModalUploadService
  ) {
    this.activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if ( id !== 'nuevo') {
        this.cargarUsuario(id);
      } else {
        this.esNuevo = true;
      }

    });

  }

  ngOnInit() {
    this._modalUploadService.notificacion
    .subscribe( resp => this.cargarUsuario(this.usuario.id));
  }

  cargarUsuario ( id: number ) {

    this._usuarioService.obtenerUsuarioPorId( id )
          .subscribe( (resp: Usuario) => {
            this.usuario = resp;
          });
  }

  guardarUsuario(forma: NgForm) {

    if (this.esNuevo) {
      this._usuarioService.crearUsuario( this.usuario )
      .subscribe(resp => this.router.navigate(['/mantenimiento/usuarios']));
    } else {
      this._usuarioService.actualizarUsuario( this.usuario )
      .subscribe();
    }

  }

  cambiarImagen() {

    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario.id );

  }

  seleccionImage( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  mostrarModal( id ) {
    console.log('ha pulsado el modal');
    if (!this.esNuevo) {
      this._modalUploadService.mostrarModal('usuarios', id);
    } else {
      swal('Debe de guardar primero el usuario');
    }
  }

}
