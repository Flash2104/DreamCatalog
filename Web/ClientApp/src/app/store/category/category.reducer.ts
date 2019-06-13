import { initialState, ICategoryStateModel } from './category.model';
import { Action } from '@ngrx/store';
import { CategoryActionTypes, CategoryLoadCompleteAction } from './category.actions';

export function categoryReducer(state: ICategoryStateModel = initialState, action: Action) {
  const model = { ...state };

  switch (action.type) {
    case CategoryActionTypes.Init: {
       return model;
    }
    case CategoryActionTypes.Load: {
      model.isLoading = true;
      return model;
    }
    case CategoryActionTypes.LoadComplete: {
      const actionComplete = action as CategoryLoadCompleteAction;
      model.category = actionComplete.payload;
      model.isLoading = false;
      return model;
    }
    default:
      return model;
  }
}
