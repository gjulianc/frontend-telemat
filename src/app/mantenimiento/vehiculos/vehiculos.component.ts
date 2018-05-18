import { Component, OnInit } from '@angular/core';
import { VehiculoService, ModalUploadService } from '../../services/service.index';
import { Vehiculo } from '../../models/vehiculo.model';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styles: []
})
export class VehiculosComponent implements OnInit {

  // tslint:disable-next-line:no-inferrable-types
  desde: number = 0;
  // tslint:disable-next-line:no-inferrable-types
  limite: number = 5;

  vehiculos: Vehiculo[];
  total: number;
  cargando: boolean;

  constructor(
    public _vehiculosService: VehiculoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarVehiculos();

    // this._modalUploadService.notificacion
    // .subscribe( resp => this.cargarVehiculos() );
  }

  cargarVehiculos() {

    this.cargando = true;

    this._vehiculosService.obtenerVehiculos(this.desde, this.limite)
      .subscribe( (resp: any) => {
        console.log(resp);
        this.vehiculos = resp.vehiculos.rows;
        this.total = resp.total;
        this.cargando = false;
      });
  }

  borrarVehiculo( vehiculo: Vehiculo ) {

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
    this.cargarVehiculos();
  }


  mostrarModal( id: number) {
    this._modalUploadService.mostrarModal('vehiculos', id);
  }
}
