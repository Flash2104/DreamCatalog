import { Action } from '@ngrx/store';
import { ITestModel, ITestModelLoadRequest } from './test-model.model';

export enum TestModelActionTypes {
  Increment = 'TEST_MODEL_INCREMENT',
  Decrement = 'TEST_MODEL_DECREMENT',
  Load = 'TEST_MODEL_LOAD',
  LoadCopmlete = 'TEST_MODEL_LOAD_COMPLETE'
}

export class TestModelIncrementAction implements Action {
  readonly type = TestModelActionTypes.Increment;
}

export class TestModelDecrementAction implements Action {
  readonly type = TestModelActionTypes.Decrement;
}

export class TestModelLoadAction implements Action {
  readonly type = TestModelActionTypes.Load;
  payload: ITestModelLoadRequest;

  constructor(payload: ITestModelLoadRequest) {
    this.payload = payload;
  }
}

export class TestModelLoadCompleteAction implements Action {
  readonly type = TestModelActionTypes.LoadCopmlete;
  payload: ITestModel;

  constructor(payload: ITestModel) {
    this.payload = payload;
  }
}
