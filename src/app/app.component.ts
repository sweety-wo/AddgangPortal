import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'az-root',
  encapsulation: ViewEncapsulation.None,
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor(private translate: TranslateService) {
    const lang = localStorage.getItem("language");
    if (lang) {
      translate.setDefaultLang(lang);
    } else {
      translate.setDefaultLang("no");
    }
  }
}
