import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/custom/auth-service/auth.service';
import { LanguageService } from 'src/app/services/language/language.service';
import { CommonState } from 'src/app/states/common/common.state';
import { AppState } from '../../../app.state';

@Component({
  selector: 'az-navbar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, OnDestroy {
  public isMenuCollapsed: boolean = true;
  public userDetails: any;
  private ngUnsubscribe = new Subject();
  @Select(CommonState.getState) commonState: Observable<any>;
  constructor(
    private _state: AppState,
    private _auth: AuthService,
    private _router: Router,
    private translate: TranslateService,
    public store: Store,
    public languageService: LanguageService
  ) {

  }

  ngOnInit() {
    this.languageService.getLanguage();
    this.commonState.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response: any) => {
        if (response.user) {
          this.userDetails = response.user;
        }
      });
  }
  ngOnDestroy() {
    if (this.ngUnsubscribe) {
      this.languageService.unSubscribeLanguage();
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }
  }

  changeLang(lang) {
    this.languageService.changeLang(lang)
  }

  fnLogout() {
    this._auth.fnRemoveToken()
    this._router.navigateByUrl('/login');
  }

}
