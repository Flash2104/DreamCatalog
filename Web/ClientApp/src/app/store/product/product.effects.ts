import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductService } from './product.service';
import { ProductActionTypes, ProductCreateAction, ProductCreateCompleteAction, ProductLoadAction, ProductUpdateAction, ProductUpdateCompleteAction } from './product.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { IProductModel } from './product.model';
import { Action } from '@ngrx/store';
import { ProductListLoadAction } from '../product-list/product-list.actions';
import { ProductListRequestModel } from '../product-list/product-list.model';
import { BaseDestroyComponent } from 'src/app/components/BaseDestroyComponent';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects extends BaseDestroyComponent {

  categoryId: number;
  page: number;
  volume: number;

  constructor(
    private _srv: ProductService,
    private actions$: Actions,
    private route: ActivatedRoute) {
    super();
    this.route.paramMap.pipe(this.takeUntilDestroyed()).subscribe(pm => {
      this.categoryId = +pm.get('categoryId');
      this.page = +pm.get('page');
      this.volume = +pm.get('volume');
    });
  }

  @Effect()
  createProduct$ = this.actions$.pipe(
    ofType(ProductActionTypes.Create),
    switchMap((action: ProductCreateAction) => this._srv.create(action.payload)),
    map((res: IProductModel) => {
      let actions: Action[] = [];
      if (res) {
        if (!!this.categoryId) {
          actions.push(new ProductListLoadAction(new ProductListRequestModel(this.categoryId, this.page, this.volume)));
        }
        actions.push(new ProductCreateCompleteAction(res));
      }
      return actions;
    }),
    catchError(error => of(console.log('Ошибка createProduct effect!: ', error)))
  );

  @Effect()
  updateProduct$ = this.actions$.pipe(
    ofType(ProductActionTypes.Load),
    switchMap((action: ProductUpdateAction) => this._srv.update(action.payload)),
    map((res: IProductModel) => {
      if (res) {
        return new ProductUpdateCompleteAction(res);
      }
    }),
    catchError(error => of(console.log('Ошибка updateProduct effect!: ', error)))
  );

  @Effect()
  loadProduct$ = this.actions$.pipe(
    ofType(ProductActionTypes.Load),
    switchMap((action: ProductLoadAction) => this._srv.get(action.payload)),
    map((res: IProductModel) => {
      if (res) {
        return new ProductCreateCompleteAction(res);
      }
    }),
    catchError(error => of(console.log('Ошибка loadProduct effect!: ', error)))
  );
}
