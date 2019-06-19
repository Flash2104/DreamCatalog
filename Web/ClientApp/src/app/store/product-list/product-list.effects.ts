import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductListService } from './product-list.service';
import { ProductListActionTypes, ProductListLoadAction, ProductListLoadCompleteAction, ProductListSetVolumeAction, ProductListGetVolumeAction, ProductListGetVolumeCompleteAction, ProductListSetVolumeCompleteAction, ProductsDeleteAction, ProductsDeleteCompleteAction, ProductListErrorAction } from './product-list.actions';
import { map, catchError, switchMap } from 'rxjs/operators';
import { IProductListResponseModel } from './product-list.model';
import { of } from 'rxjs';
import { IResponse } from '../models';

@Injectable()
export class ProductListEffects {

  constructor(
    private actions$: Actions,
    private _srv: ProductListService
  ) { }

  @Effect({ resubscribeOnError: true })
  loadProductList$ = this.actions$.pipe(
    ofType(ProductListActionTypes.Load),
    switchMap((action: ProductListLoadAction) => this._srv.getList(action.payload)),
    map((response: IProductListResponseModel) => {
      if (!!response) {
        return new ProductListLoadCompleteAction(response);
      }
      return new ProductListErrorAction('load list error');
    }),
    catchError(error => of(console.log('Ошибка loadProductList effect!: ', error)))
  )

  @Effect()
  deleteProducts$ = this.actions$.pipe(
    ofType(ProductListActionTypes.Delete),
    switchMap((action: ProductsDeleteAction) => this._srv.delete(action.payload)),
    map((response: IResponse<any>) => {
      if(response.success){
        return new ProductsDeleteCompleteAction();
      }
      return new ProductListErrorAction('delete products error');
    }),
    catchError(error => of(console.log('Ошибка loadProductList effect!: ', error)))
  )

  @Effect()
  setVolume$ = this.actions$.pipe(
    ofType(ProductListActionTypes.SetVolume),
    switchMap((action: ProductListSetVolumeAction) => this._srv.setVolume(action.payload)),
    map(() => new ProductListSetVolumeCompleteAction()),
    catchError(error => of(console.log('Ошибка setVolumeProductList effect!: ', error)))
  )

  @Effect()
  getVolume$ = this.actions$.pipe(
    ofType(ProductListActionTypes.GetVolume),
    switchMap(() => this._srv.getVolume()),
    map((response: number) => {
      return new ProductListGetVolumeCompleteAction(response);
    }),
    catchError(error => of(console.log('Ошибка getVolumeProductList effect!: ', error)))
  )
}
