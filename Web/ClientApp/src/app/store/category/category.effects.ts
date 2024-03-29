import { Actions, Effect, ofType } from '@ngrx/effects';
import { CategoryService } from './category.service';
import { Injectable } from '@angular/core';
import { catchError, switchMap, map, exhaustMap, debounceTime } from 'rxjs/operators';
import { CategoryActionTypes, CategoryLoadCompleteAction, CategoryLoadAction, CategoryErrorAction } from './category.actions';
import { of } from 'rxjs';
import { ICategoryModel } from './category.model';
import { IResponse } from '../models';
import { prepareErrorMessage } from 'src/app/services/helper';

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
      debounceTime(200),
      switchMap((action: CategoryLoadAction) => this._srv.get(action.payload.id)),
      map((resp: IResponse<ICategoryModel>) => {
        if (!!resp && resp.success) {
          return new CategoryLoadCompleteAction(resp.data);
        }
        let messages: string = prepareErrorMessage(resp);
        return new CategoryErrorAction('Ошибка загрузки категории!');
      }),
      catchError(error => of(console.log('Ошибка loadCategories effect!: ', error)))
    )
}
