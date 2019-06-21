import { Actions, Effect, ofType } from '@ngrx/effects';
import { CategoryTreeService } from './category-tree.service';
import { Injectable } from '@angular/core';
import { map, catchError, switchMap, exhaustMap } from 'rxjs/operators';
import { CategoryTreeActionTypes, CategoryTreeLoadCompleteAction, CategoryTreeErrorAction } from './category-tree.actions';
import { ICategoryTreeModel } from './category-tree.model';
import { of } from 'rxjs';
import { IResponse } from '../models';

@Injectable()
export class CategoryTreeEffects {

  constructor(
    private actions$: Actions,
    private _srv: CategoryTreeService
  ) {
  }

  @Effect()
  loadCategories$ = this.actions$
    .pipe(
      ofType(CategoryTreeActionTypes.Load),
      exhaustMap(() => this._srv.getAll()),
      map((resp: IResponse<ICategoryTreeModel[]>) => {
        if (resp.success) {
          return new CategoryTreeLoadCompleteAction(resp.data);
        }
        return new CategoryTreeErrorAction('Ошибка загрузки дерева категорий');
      }),
      catchError(error => of(console.log('Ошибка loadCategories effect!: ', error)))
    )
}
