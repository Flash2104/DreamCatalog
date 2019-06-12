import { Action } from '@ngrx/store';
import { ICategoryTreeModel } from './category-tree.model';

export enum CategoryTreeActionTypes {
  Load = 'CategoryTreeLoad',
  LoadComplete = 'CategoryTreeLoadComplete'
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
