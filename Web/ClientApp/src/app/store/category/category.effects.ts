import { Actions, Effect, ofType } from '@ngrx/effects';
import { CategoryService } from './category.service';
import { Injectable } from '@angular/core';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CategoryActionTypes, CategoryLoadAllAction, CategoryLoadAllCompleteAction } from './category.actions';
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
  loadCategories$ = this.actions$
  .pipe(
    ofType(CategoryActionTypes.LoadAll),
    mergeMap((action: CategoryLoadAllAction) => this._srv.getAll()),
    map((resp: ICategoryModel[]) => {
      console.log('response from load all:', resp);
      return new CategoryLoadAllCompleteAction(resp);
    }),
    catchError(error => of(console.log('Ошибка!: ', error)))
  )
}
