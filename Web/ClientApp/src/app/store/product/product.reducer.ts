import { Action } from '@ngrx/store';
import { IProductView, initialState } from './product.model';
import {
  ProductActionTypes,
  ProductAddChangeAction,
  ProductCreateCompleteAction,
  ProductLoadCompleteAction,
  ProductUpdateCompleteAction
} from './product.actions';

export function productReducer(state: IProductView = initialState, action: Action) {
  const model = { ...state };
  switch (action.type) {
    case (ProductActionTypes.AddChange): {
      const addChange = action as ProductAddChangeAction;
      model.changes.push(addChange.payload);
      return model;
    }
    case (ProductActionTypes.Create): {
      model.isProcessing = true;
      return model;
    }
    case (ProductActionTypes.CreateComplete): {
      const createCompleteAction = action as ProductCreateCompleteAction;
      model.model = createCompleteAction.payload;
      model.isProcessing = false;
      return model;
    }
    case (ProductActionTypes.Update): {
      model.isProcessing = true;
      return model;
    }
    case (ProductActionTypes.UpdateComplete): {
      const createCompleteAction = action as ProductUpdateCompleteAction;
      model.model = createCompleteAction.payload;
      model.isProcessing = false;
      return model;
    }
    case (ProductActionTypes.Load): {
      model.isLoading = true;
      return model;
    }
    case (ProductActionTypes.LoadComplete): {
      const loadCompleteAction = action as ProductLoadCompleteAction;
      model.model = loadCompleteAction.payload;
      model.isLoading = false;
      return model;
    }
  }
}
