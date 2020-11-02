import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ResetPasswordComponent } from './reset-password.component'
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/common/shared/shared.module';

export const routes = [
  { path: '', component: ResetPasswordComponent, pathMatch: 'full' }
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxsFormPluginModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResetPasswordComponent]
})
export class ResetPasswordModule { }
