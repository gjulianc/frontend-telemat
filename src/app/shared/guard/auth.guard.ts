import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/service.index';

@Injectable()
export class AuthGuard implements CanActivate {

  paso: boolean;

    constructor(private router: Router,
    public _usuarioServices: UsuarioService) {
      this.paso = false;
     }

    canActivate() {

       if ( this._usuarioServices.estaLogado()  ) {
          console.log ( 'HA PASADO POR EL GUARD');
          return true;
        } else {
          console.log( 'Bloqueado por guard' );
          this.router.navigate(['/login']);
          return false;
        }

    }
}
