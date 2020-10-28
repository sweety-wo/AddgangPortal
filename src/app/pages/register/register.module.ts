import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { SharedModule } from 'src/app/common/shared/shared.module';

export const routes = [
  { path: '', component: RegisterComponent, pathMatch: 'full' }
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
  declarations: [RegisterComponent],
})
export class RegisterModule { }
