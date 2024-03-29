import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from './product.service';
import { ProductActionTypes, ProductCreateAction, ProductCreateCompleteAction, ProductLoadAction, ProductUpdateAction, ProductUpdateCompleteAction, ProductLoadCompleteAction, ProductInitAction, ProductErrorAction } from './product.actions';
import { switchMap, map, catchError, concatMap, exhaustMap, debounceTime, concat } from 'rxjs/operators';
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
import { Action } from 'rxjs/internal/scheduler/Action';

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

  @Effect()
  createCompleteProduct$ = this.actions$.pipe(
    ofType(ProductActionTypes.CreateComplete),
    map((action: ProductCreateCompleteAction) => {
      const categoryId = this.getCategory();
      if (!!categoryId) {
        this._routeSrv.navigateToProduct(categoryId, action.payload.id);
      } else {
        this._routeSrv.navigateToCatalog();
      }
      return this.prepareLoadListAction(action);
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
        return this.prepareLoadListAction(action);
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
        const categoryId = this.getCategory();
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

  private getCategory() {
    return !!this._state.value && !!this._state.value.categoryModuleStore
      && !!this._state.value.categoryModuleStore.category
      && this._state.value.categoryModuleStore.category.id;
  }

  private prepareLoadListAction(action: ProductUpdateCompleteAction) {
    const payload = action.payload;
    const page = this._state.value.productListModuleStore && this._state.value.productListModuleStore.currentPage || 1;
    const sorting = this._state.value.productListModuleStore && this._state.value.productListModuleStore.sorting || null;
    return new ProductListLoadAction(<IProductListRequestModel>{
      categoryId: payload.categoryId,
      page: page,
      sort: sorting,
      take: 5
    });
  }
}
