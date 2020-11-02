import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

import {
  LoginAction,
  LogoutAccountAction, ResetAccountStateAction,
  ResetPasswordAction,
  SignUpAction,
} from './account.action';
import { AccountStateModel, DefaultAccountStateModel } from './account.model';
import { Injectable, NgZone } from '@angular/core';
import { AccountService } from './account.service';
import { AuthTokenModel } from '../../core/models/auth-model';
import { AuthService } from '../../services/custom/auth-service/auth.service';
import { ForgotPasswordFormStateAction, ResetPasswordFormStateAction } from '../form';
import { setUser } from 'src/app/states/common/common.actions';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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
    private zone: NgZone,
    public loader: NgxSpinnerService
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
      console.log('login', result);
      if (result) {
        // this._auth.fnSetToken('true');
        // this._auth.fnGetAuthUser()
        this._store.dispatch(new setUser(result))
        setState({ ...state, auth: result });
        this._toastr.success('Login successful');
        this.zone.run(() => {
          this.loader.hide();
          this._router.navigate(['/pages']);
        });
      }
      else {
        this.loader.hide();
        this._toastr.error('Something went wrong.');
      }
    }, (err) => {
      this.loader.hide();
      setState({ ...state, isLoading: false });
    }));
  }

  @Action(SignUpAction)
  SignUpAction({ getState, setState }: StateContext<AccountStateModel>, { payload }: SignUpAction) {
    const state = getState();
    setState({ ...state, isLoading: true });
    return this._accountService.fnSignUp(payload).pipe(tap((result: any) => {
      setState({ ...state, isLoading: false, auth: result });
      this.loader.hide();
      this._toastr.success('Registration successful');
      this._router.navigate(['/login']);
    }, (err) => {
      this.loader.hide();
      setState({ ...state, isLoading: false });
    }));
  }

  @Action(LogoutAccountAction)
  LogoutAccountAction({ getState, setState }: StateContext<AccountStateModel>) {
    const state = getState();
    setState({ ...state, auth: null });
    this.loader.hide();
  }

  @Action(ForgotPasswordFormStateAction)
  ForgotPasswordFormStateAction({ getState, setState }: StateContext<AccountStateModel>,
    { payload }: ForgotPasswordFormStateAction) {
    const state = getState();
    setState({ ...state, auth: null });
    return this._accountService.fnForgotPassword(payload).pipe(tap((result: any) => {
      if (result) {
        this.loader.hide();
        this._toastr.success('Email sent successfully');
        this._router.navigate(['/login']);
      }
      else {
        this.loader.hide();
        this._toastr.error('Something went wrong.');
      }
    }, (err) => {
      this.loader.hide();
      setState({ ...state, isLoading: false });
      console.log(err.error.message);
    }));
  }

  @Action(ResetPasswordAction)
  ResetPasswordAction({ getState, setState }: StateContext<AccountStateModel>,
    { payload }: ResetPasswordAction) {
    const state = getState();
    setState({ ...state, auth: null });
    return this._accountService.fnResetPassword(payload)
      .pipe(tap((result: any) => {
        if (result) {
          this.loader.hide();
          this._toastr.success('Password reset successfully');
          console.log(result);
        } else {
          this.loader.hide();
          this._toastr.error('Something went wrong.');
        }
      }, (err) => {
        this.loader.hide();
        setState({ ...state, isLoading: false });
        console.log(err.error.message);
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
