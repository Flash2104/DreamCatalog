import { Action } from '@ngrx/store';
import { ICategoryRequestModel, ICategoryModel } from './category.model';

export enum CategoryActionTypes {
  Load = 'CategoryLoad',
  LoadComplete = 'CategoryLoadComplete',
  LoadAll = 'CategoryLoadAll',
  LoadAllComplete = 'CategoryLoadAllComplete'
}

export class CategoryLoadAction implements Action {
  type = CategoryActionTypes.Load;
  payload: ICategoryRequestModel;

  constructor(payload: ICategoryRequestModel) {
    this.payload = payload;
  }
}

export class CategoryLoadCompleteAction implements Action {
  type = CategoryActionTypes.LoadComplete;
  payload: ICategoryModel;

  constructor(payload: ICategoryModel) {
    this.payload = { ...payload };
  }
}

export class CategoryLoadAllAction implements Action {
  type = CategoryActionTypes.LoadAll;
}

export class CategoryLoadAllCompleteAction implements Action {
  type = CategoryActionTypes.LoadAllComplete;
  payload: ICategoryModel[];

  constructor(payload: ICategoryModel[]) {
    this.payload = payload;
  }
}
