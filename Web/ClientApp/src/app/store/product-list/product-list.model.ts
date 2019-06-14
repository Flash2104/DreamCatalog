import { ICategoryModel } from '../category/category.model';

export interface IProductListStateModel {
  isLoading: boolean;

  totalElements: number;
  listData: IProductViewModel[];
  volume: number;
}

export interface IProductListResponseModel {
  list: IProductViewModel[];
  totalElements: number;
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
  sort: ISortRequestModel;
  take: number;
  skip: number;
}

export interface ISortRequestModel {
  column: string;
  direction: string;
}

export class ProductListRequestModel implements IProductListRequestModel {
  categoryId: number;
  sort: ISortRequestModel;
  take: number;
  skip: number;

  constructor(categoryId: number, sort: ISortRequestModel, page: number, volume: number) {
    this.categoryId = categoryId;
    this.sort = sort;
    this.skip = (page - 1) * volume;
    this.take = volume;
  }
}

export const VOLUME_KEY = 'VOLUME_LIST_VALUE';

export const initialState: IProductListStateModel = {
  isLoading: false,
  listData: null,
  totalElements: null,
  volume: 10
};
