import { State, Action, Selector, StateContext } from '@ngxs/store';
import { CommonAction, setLanguage } from './common.actions';

export interface CommonStateModel {
  language: string
}

@State<CommonStateModel>({
  name: 'common',
  defaults: {
    language: ""
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
}
