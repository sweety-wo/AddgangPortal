export class CommonAction {
  public static readonly type = '[Common] Add item';
  constructor(public payload: string) { }
}

export class setLanguage {
  static readonly type = '[Common] setLanguage';

  constructor(public lang: string) {
  }
}

export class setUser {
  static readonly type = '[Common] setUser';

  constructor(public user: Object) {
  }
}