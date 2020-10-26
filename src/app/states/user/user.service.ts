import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../core/models/user-model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) {
  }

  getUser(userId: string) {
    return this._http.get<UserModel>(environment.API_URL + `v1/users/${userId}`);
  }

  getUsers() {
    return this._http.get(environment.API_URL + `v1/users`);
  }

  fnUpdateUser(userId: string, payload: any) {
    return this._http
      .put(environment.API_URL + `v1/users/${userId}`, payload);
  }

  fnCreateUser(payload: any) {
    return this._http
      .post(environment.API_URL + `v1/users/`, payload);
  }
}
