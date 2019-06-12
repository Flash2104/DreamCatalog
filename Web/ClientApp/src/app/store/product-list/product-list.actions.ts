import { Action } from '@ngrx/store';
import { IProductListRequestModel, IProductViewModel } from './product-list.model';

export enum ProductListActionTypes {
  SetVolume = "SetProductListVolume",
  SetVolumeComplete = "SetProductListVolumeComplete",
  GetVolume = "GetProductListVolume",
  GetVolumeComplete = "GetProductListVolumeComplete",

  Load = "LoadProductList",
  LoadComplete = "LoadProductListComplete",
}

export class ProductListSetVolumeAction implements Action {
  type = ProductListActionTypes.SetVolume;
  payload: number;

  constructor(payload: number) {
    this.payload = payload;
  }
}

export class ProductListSetVolumeCompleteAction implements Action {
  type = ProductListActionTypes.SetVolumeComplete;
}

export class ProductListGetVolumeAction implements Action {
  type = ProductListActionTypes.GetVolume;
}

export class ProductListGetVolumeCompleteAction implements Action {
  type = ProductListActionTypes.GetVolumeComplete;
  payload: number;

  constructor(payload: number) {
    this.payload = payload;
  }
}

export class ProductListLoadAction implements Action {
  type = ProductListActionTypes.Load;
  payload: IProductListRequestModel;

  constructor(payload: IProductListRequestModel) {
    this.payload = payload;
  }
}

export class ProductListLoadCompleteAction implements Action {
  type = ProductListActionTypes.LoadComplete;
  payload: IProductViewModel[];

  constructor(payload: IProductViewModel[]) {
    this.payload = payload;
  }
}

