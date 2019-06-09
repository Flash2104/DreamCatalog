import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductListService } from './product-list.service';
import { ProductListActionTypes } from './product-list.actions';

@Injectable()
export class ProductListEffect {

  constructor(
    private actions$: Actions, 
    private _srv: ProductListService
    ) { }

    @Effect()
    loadProductList$ = this.actions$.pipe(
      ofType(ProductListActionTypes)
    )
}
