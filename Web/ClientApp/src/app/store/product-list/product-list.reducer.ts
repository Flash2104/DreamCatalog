import { IProductListStateModel, initialState } from './product-list.model';
import { Action } from '@ngrx/store';
import { ProductListActionTypes, ProductListLoadCompleteAction, ProductListGetVolumeCompleteAction, ProductListLoadAction, ProductListErrorAction, ProductsDeleteCompleteAction } from './product-list.actions';

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
      model.isLoading = false;
      return model;
    }
    case ProductListActionTypes.Load: {
      const actionLoad = action as ProductListLoadAction;
      model.currentPage = actionLoad.payload.page;
      model.sorting = actionLoad.payload.sort;
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
      return model;
    }
    case ProductListActionTypes.DeleteComplete: {
      const actionComplete = action as ProductsDeleteCompleteAction;
      model.notifications.push(`Удалено ${actionComplete.payload} продуктов`);
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
