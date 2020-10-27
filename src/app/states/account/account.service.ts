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
    const form = {
      email: payload.email,
      password: payload.password
    }
    console.log(environment.API_URL + `auth/login`, form);
    return this._http.post<AuthTokenModel>(environment.API_URL + `auth/login`, form);
  }

  fnSignUp(payload: AuthModel) {
    const form = {
      email: payload.userName,
      password: payload.password
    }
    console.log(environment.API_URL + `auth/signup`, form);
    return this._http.post<AuthTokenModel>(environment.API_URL + `auth/signup`, form);
  }

  fnForgotPassword(payload: ForgotPassword) {
    console.log(payload);
   
    return of(payload)
  }
}
