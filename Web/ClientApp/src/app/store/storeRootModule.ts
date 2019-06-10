import { ActionReducerMap } from '@ngrx/store';
import { testModelReducer } from './testModel/test-model.reducer';
import { ITestModel } from './testModel/test-model.model';
import { ICategoryTreeView } from './category/category.model';
import { categoryReducer } from './category/category.reducer';
import { IProductListView } from './product-list/product-list.model';
import { productListReducer } from './product-list/product-list.reducer';
import { IProductView } from './product/product.model';
import { productReducer } from './product/product.reducer';

export interface IAppStore {
  testModuleStore: ITestModel;
  categoryModuleStore: ICategoryTreeView,
  productListModuleStore: IProductListView,
  productModuleStore: IProductView
}

export module StoreRootModule {
  export const model: ActionReducerMap<IAppStore> = {
    testModuleStore: testModelReducer,
    categoryModuleStore: categoryReducer,
    productListModuleStore: productListReducer,
    productModuleStore: productReducer
  };
}
