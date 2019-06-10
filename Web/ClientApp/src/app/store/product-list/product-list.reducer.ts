import { IProductListView, initialState } from './product-list.model';
import { Action } from '@ngrx/store';
import { ProductListActionTypes, ProductListLoadCompleteAction } from './product-list.actions';

export function productListReducer(state: IProductListView = initialState, action: Action) {
  const model = { ...state };

  switch (action.type) {
    case ProductListActionTypes.Load: {
      model.isLoading = true;
      return model;
    }
    case ProductListActionTypes.LoadComplete: {
      const actionComplete = action as ProductListLoadCompleteAction;
      model.list = actionComplete.payload;
      model.isLoading = false;
      return model;
    }
  }
}
