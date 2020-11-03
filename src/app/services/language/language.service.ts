import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { setLanguage } from 'src/app/states/common/common.actions';
import { CommonState } from 'src/app/states/common/common.state';


@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  @Select(CommonState.getState) commonState: Observable<any>;
  private ngUnsubscribe = new Subject();
  public defaulLang = "no";
  constructor(public translate: TranslateService, public store: Store) { }


  getLanguage() {
    this.commonState.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response: any) => {
        if (response.language) {
          this.translate.setDefaultLang(response.language);
        } else {
          this.translate.setDefaultLang(this.defaulLang);
        }
      });
  }

  unSubscribeLanguage() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  
  changeLang(lang) {
    this.translate.setDefaultLang(lang);
    this.store.dispatch(new setLanguage(lang))
  }
}
