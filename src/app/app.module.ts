import 'pace';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app.routing';
import { AppConfig } from './app.config';
import { AppComponent } from './app.component';
import { ErrorComponent } from './pages/error/error.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StateModule } from './states/state.module';
import { StartupService } from './services/custom/startup-service/startup.service';
import { InterceptorService } from './services/custom/interceptor-service/interceptor.service';
import { UniversalStorageService } from './services/custom/universal-storage-service/universal-storage.service';
import { AuthGuardService } from './services/custom/auth-gaurd-service/auth-guard.service';
import { NotAuthGuardService } from './services/custom/no-auth-guard-service/no-auth-guard.service';
import { AppState } from './app.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

export function init(startup: StartupService): Function {
  return (): Promise<any> => startup.init();
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA1rF9bttCxRmsNdZYjW7FzIoyrul5jb-s'
    }),
    StateModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxsReduxDevtoolsPluginModule.forRoot()
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: init, multi: true, deps: [StartupService] },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    UniversalStorageService,
    AuthGuardService,
    NotAuthGuardService,
    AppState,
    AppConfig
  ],
  bootstrap: [AppComponent],
  exports: [TranslateModule]
})
export class AppModule { }
