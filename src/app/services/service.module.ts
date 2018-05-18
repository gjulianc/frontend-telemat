import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
  UsuarioService,
  SubirArchivoService,
  VehiculoService
} from './service.index';


@NgModule({
imports: [
  CommonModule,
  HttpClientModule
],
providers: [
  SubirArchivoService,
  UsuarioService,
  VehiculoService,
  ModalUploadService
],
declarations: []

})

export class ServiceModule  { }
