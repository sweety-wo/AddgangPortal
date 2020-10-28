import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from './pages.component';

export const routes: Routes = [
    {
        path: '', 
        component: PagesComponent,
        children:[
            { path:'', redirectTo:'access', pathMatch:'full' },
            { path: 'access', loadChildren: () => import('./access/access.module').then(m => m.AccessModule), data: { breadcrumb: 'Access' }  },      
            { path: 'form', loadChildren: () => import('./form-elements/form-elements.module').then(m => m.FormElementsModule), data: { breadcrumb: 'Form' } },
            { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule), data: { breadcrumb: 'Profile' }  },      
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