import { Action } from '@ngrx/store';

import { TestModelActionTypes, TestModelLoadAction, TestModelLoadCompleteAction } from './test-model.actions';
import { ITestModel } from './test-model.model';


export const initialState: ITestModel = {
  id: 1,
  counter: 0,
  title: 'some title'
};

export function testModelReducer(state: ITestModel = initialState, action: Action): ITestModel {
  const model = { ...state };
  switch (action.type) {

    case TestModelActionTypes.Increment:
      model.counter = model.counter + 1;
      return model;

    case TestModelActionTypes.Decrement:
      model.counter = model.counter - 1;
      return model;

    case TestModelActionTypes.Load:
      const requestModel = action as TestModelLoadAction;
      model.title = '';
      model.id = requestModel.payload.id;
      model.counter = 1;
      return model;

    case TestModelActionTypes.LoadCopmlete:
      const response = action as TestModelLoadCompleteAction;
      model.counter = response.payload.counter;
      model.title = response.payload.title;
      model.id = response.payload.id;
      return model;

    default:
      return model;
  }
}
