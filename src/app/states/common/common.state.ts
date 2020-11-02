import { State, Action, Selector, StateContext } from '@ngxs/store';
import { CommonAction, setLanguage, setUser } from './common.actions';

export interface CommonStateModel {
  language: string,
  user: any
}

@State<CommonStateModel>({
  name: 'common',
  defaults: {
    language: "",
    user: null
  }
})
export class CommonState {

  @Selector()
  public static getState(state: CommonStateModel) {
    return state;
  }

  @Action(setLanguage)
  setLanguage({ getState, setState }: StateContext<CommonStateModel>, { lang }: setLanguage) {
    const state = getState();
    console.log(lang);
    setState({ ...state, language: lang });
  }
  @Action(setUser)
  setUser({ getState, setState }: StateContext<CommonStateModel>, { user }: setUser) {
    const state = getState();
    setState({ ...state, user: user });
  }
}
