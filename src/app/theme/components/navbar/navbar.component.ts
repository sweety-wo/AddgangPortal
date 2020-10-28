import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/custom/auth-service/auth.service';
import { AppState } from '../../../app.state';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'az-navbar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [SidebarService]
})

export class NavbarComponent {
  public isMenuCollapsed: boolean = true;
  userDetails: any;

  constructor(
    private _state: AppState,
    private _auth: AuthService,
    private _sidebarService: SidebarService,
    private _router: Router,
    private translate: TranslateService
  ) {
    this.userDetails = JSON.parse(localStorage.getItem('user'))
    console.log('user', this.userDetails);

  }

  changeLang(lang) {
    this.translate.setDefaultLang(lang);
    localStorage.setItem("language", lang);
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
    this._auth.fnRemoveToken();
    this._router.navigate(['login']);
  }

}
