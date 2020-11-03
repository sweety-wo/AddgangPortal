import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages.component';

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: 'form', pathMatch: 'full' },
            { path: 'form', loadChildren: () => import('./form-elements/form-elements.module').then(m => m.FormElementsModule), data: { breadcrumb: 'Form' } },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class PagesRoutingModule { }