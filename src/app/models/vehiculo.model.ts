import { TimelineVehiculo } from './timelineVehiculo.model';

export class Vehiculo {

  constructor (
    public matricula: string,
    public marca?: string,
    public modelo?: string,
    public fechaAlta?: string,
    public numeroChasis?: string,
    public nPolizaSeguro?: string,
    public fVencimientoSeguro?: string,
    public aseguradora?: string,
    public altaHacienda?: boolean,
    public identCAE?: string,
    public notas?: string,
    public id?: number,
    public img?: string,
    public timelines?: TimelineVehiculo[]

  ) { }
}
