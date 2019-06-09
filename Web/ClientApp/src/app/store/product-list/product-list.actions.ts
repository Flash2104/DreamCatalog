import { Action } from '@ngrx/store';
import { IProductListRequestModel, IProductModel, IProductViewModel, IProductCreateRequestModel } from './product-list.model';

export enum ProductListActionTypes {
  Create = "CreateProduct",
  CreateComplete = "CreateProductComplete",
  LoadList = "LoadProductList",
  LoadListComplete = "LoadProductListComplete",
  Load = "LoadProduct",
  LoadComplete = "LoadProductComplete"
}

export class ProductListLoadAction implements Action {
  type = ProductListActionTypes.LoadList;
  payload: IProductListRequestModel;

  constructor(payload: IProductListRequestModel) {
    this.payload = payload;
  }
}

export class ProductListLoadCompleteAction implements Action {
  type = ProductListActionTypes.LoadListComplete;
  payload: IProductViewModel[];

  constructor(payload: IProductViewModel[]) {
    this.payload = payload;
  }
}

export class ProductLoadAction implements Action {
  type = ProductListActionTypes.LoadList;
  payload: number;

  constructor(payload: number) {
    this.payload = payload;
  }
}

export class ProductLoadCompleteAction implements Action {
  type = ProductListActionTypes.LoadListComplete;
  payload: IProductModel;

  constructor(payload: IProductModel) {
    this.payload = payload;
  }
}

export class ProductCreateAction implements Action {
  type = ProductListActionTypes.Create;
  payload: IProductCreateRequestModel;

  constructor(payload: IProductCreateRequestModel) {
    this.payload = payload;
  }
}


export class ProductCreateCompleteAction implements Action {
  type = ProductListActionTypes.CreateComplete;
  payload: IProductModel;

  constructor(payload: IProductModel) {
    this.payload = payload;
  }
}
