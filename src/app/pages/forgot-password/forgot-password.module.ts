import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password.component';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { SharedModule } from 'src/app/common/shared/shared.module';

export const routes = [
  { path: '', component: ForgotPasswordComponent, pathMatch: 'full' }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxsFormPluginModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ForgotPasswordComponent],
})
export class ForgotPasswordModule { }
