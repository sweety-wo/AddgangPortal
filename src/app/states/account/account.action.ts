import { AuthModel } from '../../core/models/auth-model';

export class LoginAction {
  static readonly type = '[Account] LoginAction';

  constructor(public payload: AuthModel) { }
}

export class SignUpAction {
  static readonly type = '[Account] SignUpAction';

  constructor(public payload: AuthModel) { }
}

export class LogoutAccountAction {
  static readonly type = '[Account] LogoutAccountAction';

  constructor() { }
}

export class ResetAccountStateAction {
  static readonly type = '[Account] ResetAccountStateAction';

  constructor() { }
}
