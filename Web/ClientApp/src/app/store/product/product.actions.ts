import { Action } from '@ngrx/store';
import { IProductCreateRequestModel, IProductModel, IProductFieldChange, IProductUpdateRequestModel } from './product.model';

export enum ProductActionTypes {
  AddChange = 'AddChangeProductField',
  CancelChanges = 'CancelChangesProduct',

  Init = 'InitProduct',
  Create = 'CreateProduct',
  CreateComplete = 'CreateProductComplete',
  Update = 'UpdateProduct',
  UpdateComplete = 'UpdateProductComplete',
  Load = 'LoadProduct',
  LoadComplete = 'LoadProductComplete',

  Error = 'ErrorProduct'
}

export class ProductErrorAction implements Action {

  type = ProductActionTypes.Error;
  payload: string;

  constructor(payload: string) {
    this.payload = payload;
  }
}

export class ProductAddChangeAction implements Action {

  type = ProductActionTypes.AddChange;
  payload: IProductModel;

  constructor(payload: IProductModel) {
    this.payload = payload;
  }
}

export class ProductCancelChangesAction implements Action {
  type = ProductActionTypes.CancelChanges;
}

export class ProductInitAction implements Action {
  type = ProductActionTypes.Init;
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

export class ProductUpdateAction implements Action {

  type = ProductActionTypes.Update;
  payload: IProductUpdateRequestModel;

  constructor(payload: IProductUpdateRequestModel) {
    this.payload = payload;
  }
}

export class ProductUpdateCompleteAction implements Action {

  type = ProductActionTypes.UpdateComplete;
  payload: IProductModel;

  constructor(payload: IProductModel) {
    this.payload = payload;
  }
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
