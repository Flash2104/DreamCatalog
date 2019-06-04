import { ActionReducerMap } from '@ngrx/store';
import { testModelReducer } from './testModel/test-model.reducer';
import { ITestModel } from './testModel/test-model.model';

export interface IAppStore {
  testModuleStore: ITestModel;
}

export module StoreRootModule {
  export const model: ActionReducerMap<IAppStore> = {
     testModuleStore: testModelReducer
  };
}
