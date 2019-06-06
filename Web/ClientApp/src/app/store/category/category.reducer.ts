import { initialState, ICategoryTreeView } from './category.model';
import { Action } from '@ngrx/store';
import { CategoryActionTypes, CategoryLoadAllCompleteAction } from './category.actions';

export function categoryReducer(state: ICategoryTreeView = initialState, action: Action) {
  const model = { ...state };

  switch (action.type) {
    case CategoryActionTypes.LoadAll: {
      model.isLoading = true;
      return model;
    }
    case CategoryActionTypes.LoadAllComplete: {
      const actionComplete = action as CategoryLoadAllCompleteAction;
      model.data = actionComplete.payload;
      model.isLoading = false;
      return model;
    }
  }
}
