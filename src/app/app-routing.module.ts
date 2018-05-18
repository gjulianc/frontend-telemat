import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthGuard } from './shared/guard/auth.guard';

export const routes: Routes = [
{
    path: '',
    component: FullComponent,
    canActivate: [ AuthGuard ],
    children: [
        { path: 'login', redirectTo: '/authentication/login', pathMatch: 'full' },
        { path: 'dashboard', loadChildren: './dashboards/dashboard.module#DashboardModule' },
        { path: 'mantenimiento', loadChildren: './mantenimiento/mantenimiento.module#MantenimientoModule'},
        { path: 'starter', loadChildren: './starter/starter.module#StarterModule' },
        { path: 'component', loadChildren: './component/component.module#ComponentsModule' },
        { path: 'icons', loadChildren: './icons/icons.module#IconsModule' },
        { path: 'forms', loadChildren: './form/forms.module#FormModule' },
        { path: 'tables', loadChildren: './table/tables.module#TablesModule' },
        { path: 'charts', loadChildren: './charts/charts.module#ChartModule' },
        { path: 'widgets', loadChildren: './widgets/widgets.module#WidgetsModule' },
        { path: 'extra-component', loadChildren: './extra-component/extra-component.module#ExtraComponentsModule' },
        { path: 'apps', loadChildren: './pages/apps/apps.module#AppsModule' },
        { path: 'sample-pages', loadChildren: './pages/sample-pages/sample-pages.module#SamplePagesModule' }
    ]
},
{
    path: '',
    component: BlankComponent,
    children: [
        {
            path: 'authentication',
            loadChildren: './authentication/authentication.module#AuthenticationModule'
        }
    ]
},
{
    path: '**',
    redirectTo: '404'
}];

@NgModule({
    imports: [RouterModule.forRoot(routes), NgbModule.forRoot()],
    exports: [RouterModule]
})
export class AppRoutingModule { }

