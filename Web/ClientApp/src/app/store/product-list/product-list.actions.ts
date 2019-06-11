import { Action } from '@ngrx/store';
import { IProductListRequestModel, IProductViewModel } from './product-list.model';

export enum ProductListActionTypes {
  Init = "InitProductList",
  Load = "LoadProductList",
  LoadComplete = "LoadProductListComplete",
}


export class ProductListInitAction implements Action {
  type = ProductListActionTypes.Init;
  payload: IProductListRequestModel;

  constructor(payload: IProductListRequestModel) {
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

