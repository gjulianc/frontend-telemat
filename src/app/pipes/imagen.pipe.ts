import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(imagen: string, tipo: string = 'usuarios'): any {

    let url = URL_SERVICIOS + '/img';

    if ( !imagen ) {

      return url + '/usuarios/xxx';

    }

    switch ( tipo ) {

      case 'usuarios':
        url += '/usuarios/' + imagen;
        break;

      case 'vehiculos':
        url += '/vehiculos/' + imagen;
        break;

      case 'tipoAlimento':
        url += '/tipos-alimento/' + imagen;
        break;

      default:
        console.log('tipo de imagen no existe');
        url += '/usuarios/xxx';

    }

    return url;
  }

}
