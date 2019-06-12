import { ActionReducerMap } from '@ngrx/store';
import { ICategoryStateModel } from './category/category.model';
import { categoryReducer } from './category/category.reducer';
import { IProductListStateModel } from './product-list/product-list.model';
import { productListReducer } from './product-list/product-list.reducer';
import { IProductStateModel } from './product/product.model';
import { productReducer } from './product/product.reducer';
import { ICategoryTreeStateModel } from './category-tree/category-tree.model';
import { categoryTreeReducer } from './category-tree/category-tree.reducer';

export interface IAppStore {
  categoryTreeModuleStore: ICategoryTreeStateModel,
  categoryModuleStore: ICategoryStateModel,
  productListModuleStore: IProductListStateModel,
  productModuleStore: IProductStateModel
}

export module StoreRootModule {
  export const model: ActionReducerMap<IAppStore> = {
    categoryTreeModuleStore: categoryTreeReducer,
    categoryModuleStore: categoryReducer,
    productListModuleStore: productListReducer,
    productModuleStore: productReducer
  };
}
