import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../auth-service/auth.service';
import { UniversalStorageService } from '../universal-storage-service/universal-storage.service';
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

    constructor(private _router: Router,
        private _auth: AuthService,
        private toastr: ToastrService,
        private _cookies: UniversalStorageService) {
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this._auth.fnGetToken() && !request.headers.has('x-access-token')) {
            if (request.url.startsWith(environment.API_URL)) {
                request = request.clone({
                    setHeaders: {
                        'x-access-token': `${this._auth.fnGetToken()}`
                    }
                });
            }
        }
        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // do stuff with response if you want
                }
            }, (error: any) => {
                if (error instanceof HttpErrorResponse) {
                    console.log('error', error);
                    switch (error.status) {

                        case 401:
                            console.error('STATUS CODE :: 401 =>', error.error['Message']);
                            this.toastr.error(error.error['Message']);
                            this._auth.fnRemoveToken();
                            this._router.navigate(['/login']);
                            break;
                        case 403:
                            console.error('STATUS CODE :: 403 =>', error.error['Message']);
                            this.toastr.error(error.error['Message']);
                            if (this._router.url !== '/login') {
                            }
                            this._router.navigate(['/login']);
                            break;
                        case 404:
                            console.error('STATUS CODE :: 404 =>', error.error['Message']);
                            this.toastr.error(error.error['Message']);
                            this._auth.fnRemoveToken();
                            break;
                        case 400:
                            console.error('STATUS CODE :: 400 =>', error.error['Message']);
                            this.toastr.error(error.error['Message']);
                            this._auth.fnRemoveToken();
                            break;
                        default:
                            console.error('InterceptorService => ', error.status);
                            this.toastr.error(error.error['Message']);
                    }
                }
            })
        );
    }
}
