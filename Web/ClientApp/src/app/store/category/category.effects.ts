import { Actions, Effect, ofType } from '@ngrx/effects';
import { CategoryService } from './category.service';
import { Injectable } from '@angular/core';
import { map, catchError, switchMap } from 'rxjs/operators';
import { CategoryActionTypes, CategoryLoadCompleteAction, CategoryLoadAction } from './category.actions';
import { ICategoryModel } from './category.model';
import { of } from 'rxjs';

@Injectable()
export class CategoryEffects {

  constructor(
    private actions$: Actions,
    private _srv: CategoryService
  ) {
  }

  @Effect()
  loadCategory$ = this.actions$
  .pipe(
    ofType(CategoryActionTypes.Load),
    switchMap((action : CategoryLoadAction) => this._srv.get(action.payload)),
    map((resp: ICategoryModel) => {
      return new CategoryLoadCompleteAction(resp);
    }),
    catchError(error => of(console.log('Ошибка loadCategories effect!: ', error)))
  )
}
