export interface IProductListView {
  isLoading: boolean;
  isProcessing: boolean;
  isWriting: boolean;

  list: IProductViewModel[];
  current: IProductModel;
}

export interface IProductViewModel {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export interface IProductModel extends IProductViewModel {
}

export interface IProductListRequestModel {
  categoryId: number;
  take: number;
  skip: number;
}

export interface IProductCreateRequestModel {
  title: string;
  price: number;
  quantity: number;
}

export const initialState: IProductListView = {
  isLoading: false,
  isProcessing: false,
  isWriting: false,
  list: [],
  current: {
    id: null,
    price: null,
    quantity: null,
    title: ''
  }
};
