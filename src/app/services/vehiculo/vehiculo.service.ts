
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import swal from 'sweetalert';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Vehiculo } from '../../models/vehiculo.model';
import { TimelineVehiculo } from '../../models/timelineVehiculo.model';


@Injectable()
export class VehiculoService {

  vehiculo: Vehiculo;
  vehiculos: Vehiculo[];
  timeline: TimelineVehiculo[];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {  }


  obtenerVehiculos (desde: number = 0, limite: number = 5) {
    let url = URL_SERVICIOS + '/vehiculos?desde=' + desde + '&limite=' + limite;
    return this.http.get( url );
  }

  obtenerVehiculoPorId (id: number) {
    const url = URL_SERVICIOS + '/vehiculos/' + id;
    return this.http.get( url )
    .map( (resp: any) => {
      console.log(resp);
      return resp.vehiculo;
    });
  }

  crearVehiculo(vehiculo: Vehiculo) {

    const url = URL_SERVICIOS + '/vehiculos';

    return this.http.post( url, vehiculo )
              .map( (resp: any) => {
                swal('Vehiculo registrado', vehiculo.matricula, 'success' );
                return resp.vehiculo;
              });
   }



   eliminarVehiculo(id: number) {

    let url = URL_SERVICIOS + '/vehiculos/' + id;

    return this.http.delete( url )
                .map( resp => {
                  swal('Vehiculo borrado', 'El vehiculo ha sido eliminado correctamente', 'success');
                  return true;
                });

   }

   actualizarVehiculo(vehiculo: Vehiculo) {

    let url = URL_SERVICIOS + '/vehiculos/' + vehiculo.id;


    return this.http.put( url, vehiculo )
                .map( (resp: any) => {

                  if ( vehiculo.id === this.vehiculo.id ) {
                    const vehiculoDB: Vehiculo = resp.vehiculo;
                  }

                  swal('Vehículo actualizado', vehiculo.matricula, 'success' );

                  return true;
                });

   }

   cambiarImagen( archivo: File, id: number ) {

    this._subirArchivoService.subirArchivo( archivo, 'vehiculos', id )
          .then( (resp: any) => {

            this.vehiculo.img = resp.vehiculo.img;
            swal( 'Imagen Actualizada', this.vehiculo.matricula, 'success' );

          })
          .catch( resp => {
            console.log( resp );
          }) ;

  }

  cargarTimeline (id: number ) {
    const url = URL_SERVICIOS + '/timelineVehiculos/' + id;
    return this.http.get( url )
    .map( (resp: any) => {
      console.log(resp);
      return resp.timelines;
    });
  }


}
