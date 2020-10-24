import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { DirectivesModule } from '../../theme/directives/directives.module';
import { WizardComponent } from './wizard/wizard.component';


export const routes = [
  { path: '', redirectTo: 'wizard', pathMatch: 'full'},
  { path: 'wizard', component: WizardComponent, data: { breadcrumb: 'Wizard' } }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MultiselectDropdownModule,
    DirectivesModule,    
    RouterModule.forChild(routes)
  ],
  declarations: [
    WizardComponent
  ]
})
export class FormElementsModule { }
