import { Action } from '@ngrx/store';
import { IProductStateModel, initialState } from './product.model';
import {
  ProductActionTypes,
  ProductAddChangeAction,
  ProductCreateCompleteAction,
  ProductLoadCompleteAction,
  ProductUpdateCompleteAction
} from './product.actions';

export function productReducer(state: IProductStateModel = initialState, action: Action) {
  const model = { ...state };
  switch (action.type) {
    case (ProductActionTypes.AddChange): {
      const addChange = action as ProductAddChangeAction;
      model.product[addChange.payload.propertyName] = addChange.payload.newValue;
      model.changes.push(addChange.payload);
      return model;
    }
    case (ProductActionTypes.Init): {
      return initialState;
    }
    case (ProductActionTypes.Create): {
      model.isLoading = true;
      return model;
    }
    case (ProductActionTypes.CreateComplete): {
      const createCompleteAction = action as ProductCreateCompleteAction;
      model.product = createCompleteAction.payload;
      model.isLoading = false;
      return model;
    }
    case (ProductActionTypes.Update): {
      model.isLoading = true;
      return model;
    }
    case (ProductActionTypes.UpdateComplete): {
      const createCompleteAction = action as ProductUpdateCompleteAction;
      model.product = createCompleteAction.payload;
      model.isLoading = false;
      return model;
    }
    case (ProductActionTypes.Load): {
      model.isLoading = true;
      return model;
    }
    case (ProductActionTypes.LoadComplete): {
      const loadCompleteAction = action as ProductLoadCompleteAction;
      model.product = loadCompleteAction.payload;
      model.isLoading = false;
      return model;
    }
    default:
      return model;
  }
}
