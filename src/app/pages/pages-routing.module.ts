import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './pages.component';

const routes: Routes = [
    {
        path: '',
        component: PageComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboards/dashboard.module#DashboardModule' },
            { path: 'starter', loadChildren: './starter/starter.module#StarterModule' },
            { path: 'component', loadChildren: './component/component.module#ComponentsModule' },
            { path: 'icons', loadChildren: './icons/icons.module#IconsModule' },
            { path: 'forms', loadChildren: './form/forms.module#FormModule' },
            { path: 'tables', loadChildren: './table/tables.module#TablesModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartModule' },
            { path: 'widgets', loadChildren: './widgets/widgets.module#WidgetsModule' },
            { path: 'extra-component', loadChildren: './extra-component/extra-component.module#ExtraComponentsModule' },
            { path: 'apps', loadChildren: './apps/apps.module#AppsModule' },
            { path: 'sample-pages', loadChildren: './sample-pages/sample-pages.module#SamplePagesModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
