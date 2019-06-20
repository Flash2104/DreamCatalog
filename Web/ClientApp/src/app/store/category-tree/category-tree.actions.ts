import { Action } from '@ngrx/store';
import { ICategoryTreeModel } from './category-tree.model';

export enum CategoryTreeActionTypes {
  Load = 'CategoryTreeLoad',
  LoadComplete = 'CategoryTreeLoadComplete',

  Error = 'CategoryTreeError'
}

export class CategoryTreeLoadAction implements Action {
  type = CategoryTreeActionTypes.Load;
}

export class CategoryTreeLoadCompleteAction implements Action {
  type = CategoryTreeActionTypes.LoadComplete;
  payload: ICategoryTreeModel[];

  constructor(payload: ICategoryTreeModel[]) {
    this.payload = payload;
  }
}

export class CategoryTreeErrorAction implements Action {
  type = CategoryTreeActionTypes.Error;
  payload: string;

  constructor(payload: string) {
    this.payload = payload;
  }
}
