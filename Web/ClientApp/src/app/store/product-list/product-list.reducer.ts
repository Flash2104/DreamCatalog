import { IProductListStateModel, initialState } from './product-list.model';
import { Action } from '@ngrx/store';
import { ProductListActionTypes, ProductListLoadCompleteAction, ProductListGetVolumeCompleteAction, ProductListLoadAction, ProductListErrorAction } from './product-list.actions';

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
      const actionComplete = action as ProductListLoadAction;
      model.currentPage = actionComplete.payload.page;
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
    case ProductListActionTypes.Error : {
      const payload = (<ProductListErrorAction> action).payload;
      model.isLoading = false;
      model.errors.messages.push(payload);
      return model;
    }
    default:
      return model;
  }
}
