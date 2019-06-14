import { IProductListStateModel, initialState } from './product-list.model';
import { Action } from '@ngrx/store';
import { ProductListActionTypes, ProductListLoadCompleteAction, ProductListGetVolumeCompleteAction } from './product-list.actions';

export function productListReducer(state: IProductListStateModel = initialState, action: Action) {
  const model = { ...state };

  switch (action.type) {
    case ProductListActionTypes.SetVolume: {
      model.isLoading = true;
      return model;
    }
    case ProductListActionTypes.SetVolumeComplete: {
      model.isLoading = false;
      return model;
    }
    case ProductListActionTypes.GetVolume: {
      model.isLoading = true;
      return model;
    }
    case ProductListActionTypes.GetVolumeComplete: {
      const actionComplete = action as ProductListGetVolumeCompleteAction;
      model.isLoading = false;
      model.volume = actionComplete.payload;
      return model;
    }
    case ProductListActionTypes.Load: {
      model.isLoading = true;
      return model;
    }
    case ProductListActionTypes.LoadComplete: {
      const actionComplete = action as ProductListLoadCompleteAction;
      model.listData = actionComplete.payload.list;
      model.totalElements = actionComplete.payload.totalElements;
      model.isLoading = false;
      return model;
    }
    case ProductListActionTypes.Delete: {
      model.isLoading = true;
      return model;
    }
    case ProductListActionTypes.DeleteComplete: {
      model.isLoading = false;
      return model;
    }
    default:
      return model;
  }
}
