import { initialState, ICategoryTreeStateModel } from './category-tree.model';
import { Action } from '@ngrx/store';
import { CategoryTreeActionTypes, CategoryTreeLoadCompleteAction, CategoryTreeErrorAction } from './category-tree.actions';

export function categoryTreeReducer(state: ICategoryTreeStateModel = initialState, action: Action) {
  const model = { ...state };

  switch (action.type) {
    case CategoryTreeActionTypes.Load: {
      model.isLoading = true;
      return model;
    }
    case CategoryTreeActionTypes.LoadComplete: {
      const actionComplete = action as CategoryTreeLoadCompleteAction;
      model.tree = actionComplete.payload;
      model.isLoading = false;
      return model;
    }
    case CategoryTreeActionTypes.Error: {
      const actionError = action as CategoryTreeErrorAction;
      model.errors.push(actionError.payload);
      model.isLoading = false;
      return model;
    }
    default:
      return model;
  }
}
