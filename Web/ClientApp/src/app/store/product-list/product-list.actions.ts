import { Action } from '@ngrx/store';
import { IProductListRequestModel, IProductListResponseModel } from './product-list.model';

export enum ProductListActionTypes {
  SetVolume = "SetProductListVolume",
  SetVolumeComplete = "SetProductListVolumeComplete",
  GetVolume = "GetProductListVolume",
  GetVolumeComplete = "GetProductListVolumeComplete",

  Load = "LoadProductList",
  LoadComplete = "LoadProductListComplete",
  Delete = "DeleteProducts",
  DeleteComplete = "DeleteProductsComplete",

  Error = 'ErrorProductList'
}


export class ProductListErrorAction implements Action {
  type = ProductListActionTypes.Error;
  payload: string;

  constructor(payload: string) {
    this.payload = payload;
  }
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
  payload: IProductListResponseModel;

  constructor(payload: IProductListResponseModel) {
    this.payload = payload;
  }
}

export class ProductsDeleteAction implements Action {
  type = ProductListActionTypes.Delete;
  payload: number[];

  constructor(payload: number[]) {
    this.payload = payload;
  }
}

export class ProductsDeleteCompleteAction implements Action {
  type = ProductListActionTypes.DeleteComplete;
}


