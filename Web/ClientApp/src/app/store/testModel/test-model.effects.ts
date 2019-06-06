import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { TestModelActionTypes, TestModelLoadAction, TestModelLoadCompleteAction } from './test-model.actions';
import { ITestModel } from './test-model.model';
import { TestItemService } from './test-model.service';

@Injectable()
export class TestModelEffects {

  constructor(
    private actions$: Actions,
    private _srv: TestItemService,
  ) { }

  @Effect()
  loadTest$ = this.actions$
    .pipe(
      ofType(TestModelActionTypes.Load),
      mergeMap((action: TestModelLoadAction) => this._srv.get(action.payload)),
      map((response: ITestModel) => {
        console.log('response:', response);
        return new TestModelLoadCompleteAction(response);
      }),
      catchError(error => of(console.log('Ошибка!')))
    );

}
