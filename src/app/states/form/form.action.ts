import { ForgotPassword } from 'src/app/core/models/user-model';

export class LoginFormSubmitAction {
  static readonly type = '[Form] LoginFormSubmitAction';

  constructor() {
  }
}

export class SignUpFormSubmitAction {
  static readonly type = '[Form] SignUpFormSubmitAction';

  constructor() {
  }
}

export class ResetFormStateAction {
  static readonly type = '[Form] ResetFormStateAction';

  constructor() { }
}

export class ForgotPasswordFormStateAction {
  static readonly type = '[Form] ForgotPasswordFormStateAction';

  constructor(public payload: ForgotPassword) { }
}