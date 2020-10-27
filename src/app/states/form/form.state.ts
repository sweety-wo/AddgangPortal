import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import * as moment from 'moment';
import * as _ from 'lodash';

import {
  ForgotPasswordFormStateAction,
  LoginFormSubmitAction,
  ResetFormStateAction,
  SignUpFormSubmitAction,
} from './form.action';
import { Injectable } from '@angular/core';
import { FormStateModel, DefaultFormStateModel } from './form.model';
import { LoginAction, SignUpAction } from '../account/account.action';
import { tap } from 'rxjs/operators';
import { ForgotPassword } from 'src/app/core/models/user-model';

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
  LoginFormSubmitAction({ getState }: StateContext<any>) {
    const state: FormStateModel = getState();
    console.log(state);
    if (state && state.login && state.login.model) {
      this._store.dispatch(new LoginAction(state.login.model));
    }
  }

  @Action(SignUpFormSubmitAction)
  SignUpFormSubmitAction({ getState }: StateContext<any>) {
    const state = getState();
    console.log(state);
    if (state && state.signup && state.signup.model) {
      const model: any = state.signup.model;

      if (model.confirmPassword) {
        delete model.confirmPassword;
      }
      this._store.dispatch(new SignUpAction(model));
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
