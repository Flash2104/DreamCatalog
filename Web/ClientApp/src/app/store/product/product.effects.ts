import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from './product.service';
import { ProductActionTypes, ProductCreateAction, ProductCreateCompleteAction, ProductLoadAction, ProductUpdateAction, ProductUpdateCompleteAction, ProductLoadCompleteAction, ProductInitAction, ProductErrorAction } from './product.actions';
import { switchMap, map, catchError, concatMap, exhaustMap, debounce, debounceTime } from 'rxjs/operators';
import { IProductModel } from './product.model';
import { BaseDestroyComponent } from 'src/app/components/BaseDestroyComponent';
import { of, pipe } from 'rxjs';
import { IProductListRequestModel } from '../product-list/product-list.model';
import { ProductListLoadAction } from '../product-list/product-list.actions';
import { RouteService } from 'src/app/services/route.service';
import { State } from '@ngrx/store';
import { IAppStore } from '../storeRootModule';
import { IResponse } from '../models';
import { prepareErrorMessage } from 'src/app/services/helper';

@Injectable()
export class ProductEffects extends BaseDestroyComponent {

  constructor(
    private _routeSrv: RouteService,
    private _srv: ProductService,
    private actions$: Actions,
    private _state: State<IAppStore>) {
    super();
  }

  @Effect()
  createProduct$ = this.actions$.pipe(
    ofType(ProductActionTypes.Create),
    exhaustMap((action: ProductCreateAction) => this._srv.create(action.payload)),
    map((res: IResponse<IProductModel>) => {
      if (res.success) {
        return new ProductCreateCompleteAction(res.data);
      }
      return new ProductErrorAction(res.errors);
    }),
    catchError(error => of(console.log('Ошибка createProduct effect!: ', error)))
  );

  @Effect({ dispatch: false })
  createCompleteProduct$ = this.actions$.pipe(
    ofType(ProductActionTypes.CreateComplete),
    map((action: ProductCreateCompleteAction) => {
      this._routeSrv.navigateToProduct(action.payload.categoryId, action.payload.id);
      const page = this._state.value.productListModuleStore && this._state.value.productListModuleStore.currentPage || 1;
      return new ProductListLoadAction(<IProductListRequestModel>{
        categoryId: action.payload.categoryId,
        page: page,
        sort: null,
        take: 5
      });
    }),
    catchError(error => of(console.log('Ошибка createProduct effect!: ', error)))
  );

  @Effect()
  updateProduct$ = this.actions$.pipe(
    ofType(ProductActionTypes.Update),
    exhaustMap((action: ProductUpdateAction) => this._srv.update(action.payload)),
    map((res: IResponse<IProductModel>) => {
      if (res.success) {
        return new ProductUpdateCompleteAction(res.data);
      }
      // let messages: string = prepareErrorMessage(res);
      return new ProductErrorAction(res.errors);
    }),
    catchError(error => of(console.log('Ошибка updateProduct effect!: ', error)))
  );

  @Effect()
  updateCompleteProduct$ = this.actions$.pipe(
    ofType(ProductActionTypes.UpdateComplete),
    map((action: ProductUpdateCompleteAction) => {
      if (!!action.payload) {
        const payload = action.payload;
        const page = this._state.value.productListModuleStore && this._state.value.productListModuleStore.currentPage || 1;
        return new ProductListLoadAction(<IProductListRequestModel>{
          categoryId: payload.categoryId,
          page: page,
          sort: null,
          take: 5
        })
      }
      return new ProductInitAction();
    }),
    catchError(error => of(console.log('Ошибка updateProduct effect!: ', error)))
  );

  @Effect()
  loadProduct$ = this.actions$.pipe(
    ofType(ProductActionTypes.Load),
    debounceTime(200),
    switchMap((action: ProductLoadAction) => this._srv.get(action.payload)),
    map((res: IResponse<IProductModel>) => {
      if (res.success) {
        return new ProductLoadCompleteAction(res.data);
      }
      else {
        const categoryId = !!this._state.value && !!this._state.value.categoryModuleStore
          && !!this._state.value.categoryModuleStore.category
          && this._state.value.categoryModuleStore.category.id;
        if (!!categoryId) {
          this._routeSrv.navigateToCreateProduct(categoryId);
        } else {
          this._routeSrv.navigateToCatalog();
        }
      }
      // let messages: string = prepareErrorMessage(res);
      return new ProductErrorAction(res.errors);
    }),
    catchError(error => of(console.log('Ошибка loadProduct effect!: ', error)))
  );
}
