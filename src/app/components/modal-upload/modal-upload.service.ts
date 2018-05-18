import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class ModalUploadService {

  public tipo: string;
  public id: number;

  // tslint:disable-next-line:no-inferrable-types
  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() {

   }

   ocultarModal() {

    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;

   }

   mostrarModal(tipo: string, id: number) {

    this.oculto = '';
    this.id = id;
    this.tipo = tipo;

   }

}
