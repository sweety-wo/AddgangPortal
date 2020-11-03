import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageService } from './services/language/language.service';


@Component({
  selector: 'az-root',
  encapsulation: ViewEncapsulation.None,
  template: `<ngx-spinner type="ball-fussion"></ngx-spinner><router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  constructor(private translate: TranslateService, private languageService: LanguageService,
    private spinner: NgxSpinnerService) {
  }
  ngOnInit() {
    this.languageService.getLanguage();
  }
  ngOnDestroy() {
    this.languageService.unSubscribeLanguage();
  }
}
