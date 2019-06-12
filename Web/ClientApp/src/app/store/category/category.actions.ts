import { Action } from '@ngrx/store';
import { ICategoryModel } from './category.model';

export enum CategoryActionTypes {
  Load = 'CategoryLoad',
  LoadComplete = 'CategoryLoadComplete'
}

export class CategoryLoadAction implements Action {
  type = CategoryActionTypes.Load;
  payload: number;

  constructor(payload: number) {
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
