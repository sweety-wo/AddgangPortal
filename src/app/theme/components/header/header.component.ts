import { Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'az-header',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private languageService: LanguageService,
    public store: Store) { }

  changeLang(lang) {
    this.languageService.changeLang(lang)
  }

}
