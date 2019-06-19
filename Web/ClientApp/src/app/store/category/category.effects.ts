import { Actions, Effect, ofType } from '@ngrx/effects';
import { CategoryService } from './category.service';
import { Injectable } from '@angular/core';
import { catchError, switchMap, map } from 'rxjs/operators';
import { CategoryActionTypes, CategoryLoadCompleteAction, CategoryLoadAction } from './category.actions';
import { of } from 'rxjs';
import { IAppStore } from '../storeRootModule';
import { ICategoryModel } from './category.model';

@Injectable()
export class CategoryEffects {

  page: number;

  constructor(
    private actions$: Actions,
    private _srv: CategoryService
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
