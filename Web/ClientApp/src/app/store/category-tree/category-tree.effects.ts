import { Actions, Effect, ofType } from '@ngrx/effects';
import { CategoryTreeService } from './category-tree.service';
import { Injectable } from '@angular/core';
import { map, catchError, switchMap } from 'rxjs/operators';
import { CategoryTreeActionTypes, CategoryTreeLoadCompleteAction } from './category-tree.actions';
import { ICategoryTreeModel } from './category-tree.model';
import { of } from 'rxjs';

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
    switchMap(() => this._srv.getAll()),
    map((resp: ICategoryTreeModel[]) => {
      return new CategoryTreeLoadCompleteAction(resp);
    }),
    catchError(error => of(console.log('Ошибка loadCategories effect!: ', error)))
  )
}
