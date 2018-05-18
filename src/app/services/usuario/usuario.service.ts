import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import swal from 'sweetalert';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  usuarios: Usuario[];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  estaLogado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage () {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: number, token: string, usuario: Usuario) {

    localStorage.setItem('id', id.toString());
    localStorage.setItem('token', this.token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  login (usuario: Usuario, recuerdame: boolean = false) {
    if (recuerdame) {
      localStorage.setItem('username', usuario.username);
    } else {
      localStorage.removeItem('username');
    }
    const url = URL_SERVICIOS + '/login';

    return this.http.post( url, usuario )
      .map ( (resp: any) => {
        this.guardarStorage( resp.id, resp.token, resp.usuario);
        this.usuario = resp.usuario;
        return true;
      }).catch ( (err) => {
        console.log(err.error.mensaje);
        swal('Error en login', err.error.mensaje , 'error' );
        return Observable.throw( err );

      });
  }

  logout() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }


  obtenerUsuarios (desde: number = 0, limite: number = 5) {
    let url = URL_SERVICIOS + '/usuarios?desde=' + desde + '&limite=' + limite;
    return this.http.get( url );
  }

  obtenerUsuarioPorId (id: number) {
    const url = URL_SERVICIOS + '/usuarios/' + id;
    return this.http.get( url )
    .map( (resp: any) => {
      console.log(resp);
      return resp.usuario;
    });
  }

  crearUsuario(usuario: Usuario) {

    const url = URL_SERVICIOS + '/usuarios';

    return this.http.post( url, usuario )
              .map( (resp: any) => {

                swal('Usuario creado', usuario.email, 'success' );
                return resp.usuario;
              });
   }

  eliminarUsuario(id: number) {

    let url = URL_SERVICIOS + '/usuarios/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
                .map( resp => {
                  swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
                  return true;
                });

   }

   actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuarios/' + usuario.id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario )
                .map( (resp: any) => {

                  console.log('token: ' + this.token);
                  if ( usuario.id === this.usuario.id ) {
                    const usuarioDB: Usuario = resp.usuario;
                    this.guardarStorage( usuarioDB.id, this.token, usuarioDB );
                  }

                  swal('Usuario actualizado', usuario.nombre, 'success' );

                  return true;
                });

   }

   cambiarImagen( archivo: File, id: number ) {

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
          .then( (resp: any) => {

            this.usuario.img = resp.usuario.img;
            swal( 'Imagen Actualizada', this.usuario.nombre, 'success' );
            this.guardarStorage( id, this.token, this.usuario );

          })
          .catch( resp => {
            console.log( resp );
          }) ;

  }


}
