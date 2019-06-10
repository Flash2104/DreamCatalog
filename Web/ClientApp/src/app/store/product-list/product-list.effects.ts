import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductListService } from './product-list.service';
import { ProductListActionTypes, ProductListLoadAction, ProductListLoadCompleteAction } from './product-list.actions';
import { map, catchError, switchMap } from 'rxjs/operators';
import { IProductViewModel } from './product-list.model';
import { of } from 'rxjs';

@Injectable()
export class ProductListEffects {

  constructor(
    private actions$: Actions,
    private _srv: ProductListService
  ) { }

  @Effect()
  loadProductList$ = this.actions$.pipe(
    ofType(ProductListActionTypes.Load),
    switchMap((action: ProductListLoadAction) => this._srv.get(action.payload)),
    map((response: IProductViewModel[]) => {
      return new ProductListLoadCompleteAction(response);
    }),
    catchError(error => of(console.log('Ошибка loadProductList effect!: ', error)))
  )
}
