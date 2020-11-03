import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { DirectivesModule } from '../theme/directives/directives.module';
import { PipesModule } from '../theme/pipes/pipes.module';
import { PagesRoutingModule } from './pages.routing';
import { PagesComponent } from './pages.component';
import { NavbarComponent } from '../theme/components/navbar/navbar.component';
import { SharedModule } from 'src/app/common/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PerfectScrollbarModule,
    DirectivesModule,
    PipesModule,
    PagesRoutingModule
  ],
  declarations: [
    PagesComponent,
    NavbarComponent,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class PagesModule { }
