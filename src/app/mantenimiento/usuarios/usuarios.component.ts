import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { SubirArchivoService, ModalUploadService, UsuarioService} from '../../services/service.index';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  desde: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  limite: number = 5;
  total: number;
  usuarios: Usuario[];
  cargando: boolean;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();

    this._modalUploadService.notificacion
    .subscribe( resp => this.cargarUsuarios() );
  }

  cargarUsuarios() {
    this.cargando = true;

    this._usuarioService.obtenerUsuarios(this.desde, this.limite)
      .subscribe( (resp: any) => {
        this.usuarios = resp.usuarios.rows;
        this.total = resp.total;
        this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {
    // tslint:disable-next-line:prefer-const
    let desde = this.desde + valor;

    if ( desde >= this.total ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }

    // this.cargando = true;

    // this._usuarioService.buscarUsuarios( termino )
    //         .subscribe( (usuarios: Usuario[]) => {

    //           this.usuarios = usuarios;
    //           this.cargando = false;
    //         });

  }



  borrarUsuario(usuario: Usuario) {

    if ( usuario.id === this._usuarioService.usuario.id ) {
      swal( 'No puede borrar usuario' , 'No puede borrarse a sí mismo', 'error');
      return;
    }

    swal({
      title: 'Esta seguro de borrar usuario',
      text: 'Esta a punto de borrar al usuario ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then( borrar => {
      if ( borrar ) {
        this._usuarioService.eliminarUsuario( usuario.id )
        .subscribe(borrado => {
          this.cargarUsuarios();
        } );
      }


    });


  }

  mostrarModal( id ) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

}
