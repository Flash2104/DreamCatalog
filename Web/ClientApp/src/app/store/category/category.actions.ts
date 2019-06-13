import { Action } from '@ngrx/store';
import { ICategoryModel, ICategoryRequestModel } from './category.model';

export enum CategoryActionTypes {
  Init = 'CategoryInit',

  Load = 'CategoryLoad',
  LoadComplete = 'CategoryLoadComplete'
}

export class CategoryInitAction implements Action {
  type = CategoryActionTypes.Init;
}

export class CategoryLoadAction implements Action {
  type = CategoryActionTypes.Load;
  payload: ICategoryRequestModel;

  constructor(categoryId: number) {
    this.payload = {
      id: categoryId
    };
  }
}

export class CategoryLoadCompleteAction implements Action {
  type = CategoryActionTypes.LoadComplete;
  payload: ICategoryModel;

  constructor(payload: ICategoryModel) {
    this.payload = { ...payload };
  }
}
