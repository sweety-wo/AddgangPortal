export class CommonAction {
  public static readonly type = '[Common] Add item';
  constructor(public payload: string) { }
}

export class setLanguage {
  static readonly type = '[Common] setLanguage';

  constructor(public lang: string) {
  }
}