import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { setLanguage } from 'src/app/states/common/common.actions';

@Component({
  selector: 'az-header',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private translate: TranslateService,
    public store: Store) { }

  changeLang(lang) {
    this.translate.setDefaultLang(lang);
    this.store.dispatch(new setLanguage(lang))
  }

}
