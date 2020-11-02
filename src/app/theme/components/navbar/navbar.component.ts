import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/custom/auth-service/auth.service';
import { setLanguage } from 'src/app/states/common/common.actions';
import { CommonState } from 'src/app/states/common/common.state';
import { UserState } from 'src/app/states/user';
import { AppState } from '../../../app.state';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'az-navbar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [SidebarService]
})

export class NavbarComponent implements OnInit, OnDestroy {
  public isMenuCollapsed: boolean = true;
  public userDetails: any;
  private ngUnsubscribe = new Subject();
  @Select(CommonState.getState) language: Observable<any>;
  constructor(
    private _state: AppState,
    private _auth: AuthService,
    private _sidebarService: SidebarService,
    private _router: Router,
    private translate: TranslateService,
    public store: Store
  ) {

  }

  ngOnInit() {
    this.language.pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response: any) => {
        if (response.language) {
          this.translate.setDefaultLang(response.language);
        } else {
          this.translate.setDefaultLang("no");
        }
        if (response.user) {
          this.userDetails = response.user;
        }
      });
  }
  ngOnDestroy() {
    if (this.ngUnsubscribe) {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
    }
  }

  changeLang(lang) {
    this.translate.setDefaultLang(lang);
    this.store.dispatch(new setLanguage(lang))
  }


  public closeSubMenus() {
    /* when using <az-sidebar> instead of <az-menu> uncomment this line */
    // this._sidebarService.closeAllSubMenus();
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
  }

  fnLogout() {
    this._auth.fnRemoveToken()
    this._router.navigateByUrl('/login');
  }

}
