import { Component, OnInit } from '@angular/core';
import { ModalUploadService, VehiculoService } from '../../services/service.index';
import { Vehiculo } from '../../models/vehiculo.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TimelineVehiculo } from '../../models/timelineVehiculo.model';


@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styles: []
})
export class VehiculoComponent implements OnInit {

  vehiculo: Vehiculo = new Vehiculo('');
  timelines: TimelineVehiculo[];
  imagenSubir: File;
  imagenTemp: string;
  esNuevo: boolean = false;

  constructor(
    public _vehiculoService: VehiculoService,
    public _modalUploadService: ModalUploadService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
      this.activatedRoute.params.subscribe( params => {
        let id = params['id'];
        if ( id !== 'nuevo') {
          this.cargarVehiculo(id);
          this.cargarTimeline(id);
        } else {
          this.esNuevo = true;
        }
      });
  }

  ngOnInit() {
    this._modalUploadService.notificacion
    .subscribe( resp => this.cargarVehiculo(this.vehiculo.id));

  }

  cargarVehiculo(id: number) {
    this._vehiculoService.obtenerVehiculoPorId( id )
    .subscribe( (resp: Vehiculo) => {
      this.vehiculo = resp;
    });

  }

  cargarTimeline(id: number) {

     this._vehiculoService.cargarTimeline(id)
        .subscribe( (timelines: any) => {
          console.log(id);

          this.timelines = timelines.rows;
          console.log(this.timelines);
        });
  }

  guardarvehiculo(forma: NgForm) {
    if (this.esNuevo) {
      this._vehiculoService.crearVehiculo( this.vehiculo )
      .subscribe(resp => this.router.navigate(['/mantenimiento/vehiculos']));
    } else {
      this._vehiculoService.actualizarVehiculo( this.vehiculo )
      .subscribe();
    }
  }


  mostrarModal( id: number) {
    this._modalUploadService.mostrarModal('vehiculos', id);
  }


}
