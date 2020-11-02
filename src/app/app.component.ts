import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Select } from '@ngxs/store';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonState } from './states/common/common.state';


@Component({
  selector: 'az-root',
  encapsulation: ViewEncapsulation.None,
  template: `<ngx-spinner type="ball-fussion"></ngx-spinner><router-outlet></router-outlet>`,
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  @Select(CommonState.getState) language: Observable<any>;
  private ngUnsubscribe = new Subject();

  constructor(private translate: TranslateService,
    private spinner: NgxSpinnerService) {
  }
  ngOnInit() {
    this.language.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response: any) => {
        if (response.language) {
          this.translate.setDefaultLang(response.language);
        } else {
          this.translate.setDefaultLang("no");
        }
      });
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
