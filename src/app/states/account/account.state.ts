import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import {
  LoginAction,
  LogoutAccountAction, ResetAccountStateAction,
  SignUpAction,
} from './account.action';
import { AccountStateModel, DefaultAccountStateModel } from './account.model';
import { Injectable, NgZone } from '@angular/core';
import { AccountService } from './account.service';
import { AuthTokenModel } from '../../core/models/auth-model';
import { AuthService } from '../../services/custom/auth-service/auth.service';
import { ForgotPasswordFormStateAction } from '../form';
import { ToastrService } from 'ngx-toastr';

@State<AccountStateModel>({
  name: 'account',
  defaults: DefaultAccountStateModel,
})

@Injectable()
export class AccountState {

  constructor(
    private _store: Store,
    private _accountService: AccountService,
    private _auth: AuthService,
    private _router: Router,
    private _toastr: ToastrService,
    private zone: NgZone
  ) {
  }

  @Selector()
  static getIsLoading(state) {
    return state.isLoading;
  }


  @Action(LoginAction)
  LoginAction({ getState, setState }: StateContext<AccountStateModel>, { payload }: LoginAction) {
    const state = getState();
    setState({ ...state, isLoading: true });
    return this._accountService.fnSignIn(payload).pipe(tap((result: AuthTokenModel) => {
      setState({ ...state, isLoading: false });
      if (result && result.token) {
        this._auth.fnSetToken(result.token);
        this._auth.fnGetAuthUser()
        setState({ ...state, auth: result });
        this._toastr.success('Login successful');
        this.zone.run(() => {
          this._router.navigate(['/pages']);
        });
      }
    }, (err) => {
      setState({ ...state, isLoading: false });
      this._toastr.error(err.error.message);
    }));
  }

  @Action(SignUpAction)
  SignUpAction({ getState, setState }: StateContext<AccountStateModel>, { payload }: SignUpAction) {
    const state = getState();
    setState({ ...state, isLoading: true });
    return this._accountService.fnSignUp(payload).pipe(tap((result: any) => {
      setState({ ...state, isLoading: false, auth: result });
      this._toastr.success('Login successful');
      this._router.navigate(['/login']);
    }, (err) => {
      setState({ ...state, isLoading: false });
      this._toastr.error(err.error.message);
    }));
  }

  @Action(LogoutAccountAction)
  LogoutAccountAction({ getState, setState }: StateContext<AccountStateModel>) {
    const state = getState();
    setState({ ...state, auth: null });
  }

  @Action(ForgotPasswordFormStateAction)
  ForgotPasswordFormStateAction({ getState, setState }: StateContext<AccountStateModel>,
    { payload }: ForgotPasswordFormStateAction) {
    const state = getState();
    setState({ ...state, auth: null });
    return this._accountService.fnForgotPassword(payload).pipe(tap((result: any) => {
      console.log(result);
    }, (err) => {
      setState({ ...state, isLoading: false });
      console.log(err.error.message);
      this._toastr.error(err.error.message);
    }));
  }

  @Action(ResetAccountStateAction)
  ResetAccountStateAction({ getState, setState }: StateContext<AccountStateModel>) {
    const state = getState();
    setState({
      ...state,
      auth: null,
    });
  }
}
