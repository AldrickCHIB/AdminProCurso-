import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { authGuard } from '../guards/auth.guard';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [authGuard],
        children: [
            { path: '', component: DashboardComponent, data: {titulo: 'Dashboards'} },
            { path: 'progress', component: ProgressComponent,  data: {titulo: 'Progress'}},
            { path: 'account-settings', component: AccountSettingsComponent,  data: {titulo: 'Account Settings'} },
            { path: 'promesas', component: PromesasComponent,  data: {titulo: 'Promesas'}},
            { path: 'rxjs', component: RxjsComponent,  data: {titulo: 'RXJS'}}
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


