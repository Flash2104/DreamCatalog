import { ICategoryModel } from '../category/category.model';

export interface IProductListStateModel {
  isLoading: boolean;

  list: IProductViewModel[];
  volume: number;
}

export interface IProductViewModel {
  id: number;
  title: string;
  imageId: number;
  price: number;
  quantity: number;
}

export interface IProductListRequestModel {
  categoryId: number;
  take: number;
  skip: number;
}

export class ProductListRequestModel implements IProductListRequestModel {
  categoryId: number;
  take: number;
  skip: number;

  constructor(categoryId: number, page: number, volume: number) {
    this.categoryId = categoryId;
    this.skip = (page - 1) * volume;
    this.take = volume;
  }
}

export const VOLUME_KEY = 'VOLUME_LIST_VALUE';

export const initialState: IProductListStateModel = {
  isLoading: false,
  list: null,
  volume: 20
};
