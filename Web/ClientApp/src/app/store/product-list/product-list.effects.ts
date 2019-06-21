import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductListService } from './product-list.service';
import { ProductListActionTypes, ProductListLoadAction, ProductListLoadCompleteAction, ProductListSetVolumeAction, ProductListGetVolumeAction, ProductListGetVolumeCompleteAction, ProductListSetVolumeCompleteAction, ProductsDeleteAction, ProductsDeleteCompleteAction, ProductListErrorAction } from './product-list.actions';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { IProductListResponseModel } from './product-list.model';
import { of } from 'rxjs';
import { IResponse } from '../models';
import { prepareErrorMessage } from 'src/app/services/helper';

@Injectable()
export class ProductListEffects {

  constructor(
    private actions$: Actions,
    private _srv: ProductListService
  ) { }

  @Effect({ resubscribeOnError: true })
  loadProductList$ = this.actions$.pipe(
    ofType(ProductListActionTypes.Load),
    exhaustMap((action: ProductListLoadAction) => this._srv.getList(action.payload)),
    map((response: IResponse<IProductListResponseModel>) => {
      if (!!response && response.success) {
        return new ProductListLoadCompleteAction(response.data);
      }
      // let messages: string = prepareErrorMessage(response);

      return new ProductListErrorAction('Ошибки при получении списка продуктов:\r\n ');
    }),
    catchError(error => of(console.log('Ошибка loadProductList effect!: ', error)))
  )

  @Effect()
  deleteProducts$ = this.actions$.pipe(
    ofType(ProductListActionTypes.Delete),
    exhaustMap((action: ProductsDeleteAction) => this._srv.delete(action.payload)),
    map((response: IResponse<number[]>) => {
      if (response.success) {
        return new ProductsDeleteCompleteAction();
      }
      // let messages: string = prepareErrorMessage(response);

      return new ProductListErrorAction('Ошибки при удалении продуктов:\r\n ');
    }),
    catchError(error => of(console.log('Ошибка loadProductList effect!: ', error)))
  )

  @Effect()
  setVolume$ = this.actions$.pipe(
    ofType(ProductListActionTypes.SetVolume),
    exhaustMap((action: ProductListSetVolumeAction) => this._srv.setVolume(action.payload)),
    map(() => new ProductListSetVolumeCompleteAction()),
    catchError(error => of(console.log('Ошибка setVolumeProductList effect!: ', error)))
  )

  @Effect()
  getVolume$ = this.actions$.pipe(
    ofType(ProductListActionTypes.GetVolume),
    exhaustMap(() => this._srv.getVolume()),
    map((response: number) => {
      return new ProductListGetVolumeCompleteAction(response);
    }),
    catchError(error => of(console.log('Ошибка getVolumeProductList effect!: ', error)))
  )
}
