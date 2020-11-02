import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { AuthModel, AuthTokenModel } from '../../core/models/auth-model';
import { ForgotPassword } from 'src/app/core/models/user-model';
import * as moment from 'moment'

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
    console.log(environment.API_URL + `Login`, form);
    return this._http.post<AuthTokenModel>(environment.API_URL + `Login`, form);
  }

  fnSignUp(payload: any) {
    console.log(payload);
    const form = {
      "username": payload.userName,
      "contactno": payload.mobileNo,
      "email": payload.userName,
      "firstname": payload.fullName,
      "lastname": payload.surName,
      "gender": payload.sex,
      "password": payload.password,
      "dateofbirth": moment(payload.DOB).format('MM-DD-YYYY')
    }
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log(environment.API_URL + `Signup`, form);
    return this._http.post<AuthTokenModel>(environment.API_URL + `Signup`, form, { headers: headers });
  }

  fnForgotPassword(payload: ForgotPassword) {
    console.log(environment.API_URL + `ForgotPassword`, payload);
    return this._http.post<AuthTokenModel>(environment.API_URL + `ForgotPassword`, payload);
  }
}
