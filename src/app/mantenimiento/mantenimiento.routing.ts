import { Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuarioComponent } from './usuarios/usuario.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { VehiculoComponent } from './vehiculos/vehiculo.component';


export const MantenimientoRoutes: Routes = [
  {
    path: '',
    children: [
    {
      path: 'usuarios',
      component: UsuariosComponent,
      data: {
        title: 'Usuarios',
        urls: [{title: 'Usuarios', url: '/dashboard'}, {title: 'Usuarios'}]
      }
    },
    {
      path: 'vehiculos',
      component: VehiculosComponent,
      data: {
        title: 'Vehículos',
        urls: [{title: 'Vehículos', url: '/dashboard'}, {title: 'Vehículos'}]
      }
    },
    {
      path: 'usuario/:id',
      component: UsuarioComponent,
      data: {titulo: 'Mantenimiento Usuario'}
    },
    {
      path: 'vehiculo/:id',
      component: VehiculoComponent,
      data: {titulo: 'Mantenimiento Vehiculo'}
    }
  ]
  }
];
