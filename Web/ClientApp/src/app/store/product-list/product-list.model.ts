import { ICategoryModel } from '../category/category.model';

export interface IProductListStateModel {
  isLoading: boolean;
  isProcessing: boolean;

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
  category: ICategoryModel;
  take: number;
  skip: number;
}

export class ProductListRequestModel implements IProductListRequestModel {
  category: ICategoryModel;
  take: number;
  skip: number;

  constructor(category: ICategoryModel, page: number, volume: number) {
    this.category = category;
    this.skip = (page - 1) * volume;
    this.take = volume;
  }
}

export const VOLUME_KEY = 'VOLUME_LIST_VALUE';

export const initialState: IProductListStateModel = {
  isLoading: true,
  isProcessing: true,
  list: [],
  volume: 20
};
