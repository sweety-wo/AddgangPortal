import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AccountState } from './account/account.state';
import { FormState } from './form/form.state';
import { UserState } from './user/user.state';
import { CommonState } from './common/common.state';
import { SharedModule } from '../common/shared/shared.module';

const STATES = [
  AccountState,
  FormState,
  UserState,
  CommonState
];

@NgModule({
  imports: [
    NgxsModule.forRoot(STATES),
    NgxsFormPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    SharedModule
  ],
  providers: [],
})
export class StateModule { }
