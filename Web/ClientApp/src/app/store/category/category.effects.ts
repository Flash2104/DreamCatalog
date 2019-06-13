import { Actions, Effect, ofType } from '@ngrx/effects';
import { CategoryService } from './category.service';
import { Injectable } from '@angular/core';
import { catchError, switchMap, concatMap, map } from 'rxjs/operators';
import { CategoryActionTypes, CategoryLoadCompleteAction, CategoryLoadAction } from './category.actions';
import { of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { ProductListRequestModel } from '../product-list/product-list.model';
import { ProductListLoadAction } from '../product-list/product-list.actions';
import { IAppStore } from '../storeRootModule';
import { ICategoryModel } from './category.model';

@Injectable()
export class CategoryEffects {

  page: number;

  constructor(
    private actions$: Actions,
    private _srv: CategoryService,
    private _store: Store<IAppStore>
  ) {
  }

  @Effect()
  loadCategory$ = this.actions$
    .pipe(
      ofType(CategoryActionTypes.Load),
      switchMap((action: CategoryLoadAction) => this._srv.get(action.payload.id)),
      map((resp) => {
        if (!!resp) {
          return new CategoryLoadCompleteAction(resp);
        }
        return new CategoryLoadCompleteAction({} as ICategoryModel);
      }),
      catchError(error => of(console.log('Ошибка loadCategories effect!: ', error)))
    )
}
