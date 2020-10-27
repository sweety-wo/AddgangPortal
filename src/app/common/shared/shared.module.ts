import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../theme/components/header/header.component'


@NgModule({
  declarations: [HeaderComponent],
  imports:[TranslateModule],
  exports: [HeaderComponent,TranslateModule]
})
export class SharedModule { }

