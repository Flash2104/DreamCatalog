import { IProductListView, initialState } from './product-list.model';
import { Action } from '@ngrx/store';
import { ProductListActionTypes, ProductListLoadCompleteAction } from './product-list.actions';

export function productListReducer(state: IProductListView = initialState, action: Action) {
    const model = {...state};

    switch (action.type) {
        case ProductListActionTypes.LoadList: {
            model.isLoading = true;
            return model;
        }
        case ProductListActionTypes.LoadListComplete: {
            const actionComplete = action as ProductListLoadCompleteAction;
            model.list = actionComplete.payload;
            model.isLoading = false;
            return model;
        }
    }

}