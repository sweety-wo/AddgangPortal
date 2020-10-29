import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { CommonState, CommonStateModel } from './common.state';
import { CommonAction } from './common.actions';

describe('Common store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([CommonState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: CommonStateModel = {
      items: ['item-1']
    };
    store.dispatch(new CommonAction('item-1'));
    const actual = store.selectSnapshot(CommonState.getState);
    expect(actual).toEqual(expected);
  });

});
