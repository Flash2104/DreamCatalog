import { Action } from '@ngrx/store';
import { IProductRequestModel as IProductCreateRequestModel, IProductModel } from './product.model';

export enum ProductActionTypes {
  Create = "CreateProduct",
  CreateComplete = "CreateProductComplete",
  Load = "LoadProduct",
  LoadComplete = "LoadProductComplete",
}

export class ProductLoadAction implements Action {
  type = ProductActionTypes.Load;
  payload: number;

  constructor(payload: number) {
    this.payload = payload;
  }
}

export class ProductLoadCompleteAction implements Action {
  type = ProductActionTypes.LoadComplete;
  payload: IProductModel;

  constructor(payload: IProductModel) {
    this.payload = payload;
  }
}

export class ProductCreateAction implements Action {
  type = ProductActionTypes.Create;
  payload: IProductCreateRequestModel;

  constructor(payload: IProductCreateRequestModel) {
    this.payload = payload;
  }
}


export class ProductCreateCompleteAction implements Action {
  type = ProductActionTypes.CreateComplete;
  payload: IProductModel;

  constructor(payload: IProductModel) {
    this.payload = payload;
  }
}
