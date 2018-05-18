export class TimelineVehiculo {

  constructor (
    public usuario: string,
    public tipo: string,
    public descripcion: string,
    public created_at: Date,
    public vehiculo_id: string
  ) { }
}
