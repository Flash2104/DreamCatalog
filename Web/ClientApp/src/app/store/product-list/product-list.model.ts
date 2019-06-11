import { ICategoryModel } from '../category/category.model';

export interface IProductListView {
  isLoading: boolean;
  isProcessing: boolean;
  isWriting: boolean;

  list: IProductViewModel[];
  category: ICategoryModel;
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

export const initialState: IProductListView = {
  isLoading: false,
  isProcessing: false,
  isWriting: false,
  list: [],
  category: {
    id: null,
    children: [],
    name: '',
    description: ''
  }
};
