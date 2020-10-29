


export class GetAuthUserAction {
  static readonly type = '[User] GetAuthUserAction';

  constructor(public id: string) {
  }
}
export class ResetUserStateAction {
  static readonly type = '[User] ResetUserStateAction';
  constructor() {
  }
}
