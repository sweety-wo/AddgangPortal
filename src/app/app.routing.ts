import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ErrorComponent } from './pages/error/error.component';
import { AuthGuardService } from './services/custom/auth-gaurd-service/auth-guard.service';
import { NotAuthGuardService } from './services/custom/no-auth-guard-service/no-auth-guard.service';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canActivate: [NotAuthGuardService]
  },
  {
    path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule),
    canActivate: [NotAuthGuardService]
  },
  {
    path: 'forgot-password', loadChildren: () => import('./pages/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule),
    canActivate: [NotAuthGuardService]
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      preloadingStrategy: PreloadAllModules,  // <- comment this line for activate lazy load
      // useHash: true
    })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }