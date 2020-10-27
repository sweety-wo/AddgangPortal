import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { AuthModel, AuthTokenModel } from '../../core/models/auth-model';
import { ForgotPassword } from 'src/app/core/models/user-model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private _http: HttpClient) {
  }

  fnSignIn(payload: AuthModel) {
    console.log(environment.API_URL + `auth/login`, payload);
    return this._http.post<AuthTokenModel>(environment.API_URL + `auth/login`, payload);
  }

  fnSignUp(payload: AuthModel) {
    return this._http.post<AuthTokenModel>(environment.API_URL + `auth/signup`, payload);
  }

  fnForgotPassword(payload: ForgotPassword) {
    return of([]);
  }
}
