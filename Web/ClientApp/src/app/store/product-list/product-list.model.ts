export interface IProductListView {
  isLoading: boolean;
  isProcessing: boolean;
  isWriting: boolean;

  list: IProductViewModel[];
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

  constructor(categoryId: number, page: number, volume: number, ) {
    this.categoryId = categoryId;
    this.skip = (page - 1) * volume;
    this.take = volume;
  }
}

export const initialState: IProductListView = {
  isLoading: false,
  isProcessing: false,
  isWriting: false,
  list: []
};
