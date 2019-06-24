import { IBaseStateModel } from '../models';

export interface IProductListStateModel extends IBaseStateModel {
  isLoading: boolean;

  totalElements: number;
  currentPage: number;
  sorting: ISortRequestModel;
  listData: IProductViewModel[];
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
  categoryId: number;
}

export interface IProductListRequestModel {
  categoryId: number;
  sort: ISortRequestModel;
  take: number;
  page: number;
}

export interface ISortRequestModel {
  column: string;
  direction: string;
}

export class ProductListRequestModel implements IProductListRequestModel {
  categoryId: number;
  sort: ISortRequestModel;
  take: number;
  page: number;

  constructor(categoryId: number, sort: ISortRequestModel, page: number, volume: number) {
    this.categoryId = categoryId;
    this.sort = sort;
    this.page = page;
    this.take = volume;
  }
}

export const VOLUME_KEY = 'VOLUME_LIST_VALUE';

export const initialState: IProductListStateModel = {
  isLoading: false,
  listData: null,
  totalElements: null,
  currentPage: 1,
  notifications: [],
  errors: {
    messages: []
  },
  sorting: null
};
