import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MantenimientoRoutes } from './mantenimiento.routing';
import { RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuarios/usuario.component';
import { FormsModule } from '@angular/forms';


import { PipesModule } from '../pipes/pipes.module';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { VehiculoComponent } from './vehiculos/vehiculo.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    RouterModule.forChild(MantenimientoRoutes)
  ],
  declarations: [UsuariosComponent, UsuarioComponent, VehiculosComponent, VehiculoComponent]
})
export class MantenimientoModule { }
