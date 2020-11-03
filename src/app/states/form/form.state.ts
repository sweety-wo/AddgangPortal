import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import * as moment from 'moment';
import * as _ from 'lodash';

import {
  ForgotPasswordFormStateAction,
  LoginFormSubmitAction,
  ResetFormStateAction,
  ResetPasswordFormStateAction,
  SignUpFormSubmitAction,
} from './form.action';
import { Injectable } from '@angular/core';
import { FormStateModel, DefaultFormStateModel } from './form.model';
import { LoginAction, SignUpAction, ResetPasswordAction } from '../account/account.action';

@State<FormStateModel>({
  name: 'form',
  defaults: DefaultFormStateModel,
})

@Injectable()
export class FormState {
  constructor(
    private _store: Store,
  ) {
  }

  @Action(LoginFormSubmitAction)
  LoginFormSubmitAction({ getState }: StateContext<any>, { payload }: LoginFormSubmitAction) {

    const state: FormStateModel = getState();
    this._store.dispatch(new LoginAction(payload));
  }

  @Action(SignUpFormSubmitAction)
  SignUpFormSubmitAction({ getState }: StateContext<any>) {
    const state = getState();
    if (state && state.signup && state.signup.model) {
      const model: any = state.signup.model;

      if (model.confirmPassword) {
        delete model.confirmPassword;
      }
      this._store.dispatch(new SignUpAction(model));
    }
  }
  @Action(ResetPasswordFormStateAction)
  ResetPasswordFormStateAction({ getState }: StateContext<any>) {
    const state = getState();
    if (state && state.resetPassword && state.resetPassword.model) {
      const model: any = state.resetPassword.model;

      if (model.confirmPassword) {
        delete model.confirmPassword;
      }
      this._store.dispatch(new ResetPasswordAction(model));
    }
  }

  @Action(ResetFormStateAction)
  ResetFormStateAction({ getState, setState }: StateContext<any>) {
    setState(DefaultFormStateModel);
  }

  @Action(ForgotPasswordFormStateAction)
  ForgotPasswordFormStateAction({ getState, setState }: StateContext<any>, { payload }: ForgotPasswordFormStateAction) {
    // setState(DefaultFormStateModel);

  }
}
