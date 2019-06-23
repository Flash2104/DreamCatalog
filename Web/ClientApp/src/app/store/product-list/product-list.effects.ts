import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductListService } from './product-list.service';
import { ProductListActionTypes, ProductListLoadAction, ProductListLoadCompleteAction, ProductListSetVolumeAction, ProductListGetVolumeAction, ProductListGetVolumeCompleteAction, ProductListSetVolumeCompleteAction, ProductsDeleteAction, ProductsDeleteCompleteAction, ProductListErrorAction } from './product-list.actions';
import { map, catchError, exhaustMap, concatMap } from 'rxjs/operators';
import { IProductListResponseModel, IProductListRequestModel } from './product-list.model';
import { of } from 'rxjs';
import { IResponse } from '../models';
import { prepareErrorMessage } from 'src/app/services/helper';
import { State, Action } from '@ngrx/store';
import { IAppStore } from '../storeRootModule';
import { RouteService } from 'src/app/services/route.service';

@Injectable()
export class ProductListEffects {

  constructor(
    private actions$: Actions,
    private _srv: ProductListService,
    private _state: State<IAppStore>,
    private _routeSrv: RouteService,
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
    map((response: IResponse<number>) => {
      if (response.success) {
        return new ProductsDeleteCompleteAction(response.data);
      }
      // let messages: string = prepareErrorMessage(response);

      return new ProductListErrorAction('Ошибки при удалении продуктов.\r\n ');
    }),
    catchError(error => of(console.log('Ошибка loadProductList effect!: ', error)))
  )

  @Effect()
  deleteProductsComplete$ = this.actions$.pipe(
    ofType(ProductListActionTypes.DeleteComplete),
    map((action: ProductsDeleteCompleteAction) => {
      const page = this._state.value.productListModuleStore && this._state.value.productListModuleStore.currentPage || 1;
      const categoryId = !!this._state.value && !!this._state.value.categoryModuleStore
        && !!this._state.value.categoryModuleStore.category
        && this._state.value.categoryModuleStore.category.id;
      if (!!categoryId) {
        this._routeSrv.navigateToCreateProduct(categoryId);
        return new ProductListLoadAction(<IProductListRequestModel>{
          categoryId: categoryId,
          page: page,
          sort: null,
          take: 5
        });
      } else {
        this._routeSrv.navigateToCatalog();
        return new ProductListErrorAction('');
      }
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
