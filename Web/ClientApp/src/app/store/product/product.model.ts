export interface IProductListView {
  isLoading: boolean;
  isProcessing: boolean;
  isWriting: boolean;

  data: IProductViewModel[];
}

export interface IProductViewModel {
  id: number;
  name: string;
}

export interface IProductModel {
  id: number;
  name: string;
}

export interface IProductRequestModel {
  id: number;
}

export const TEST_PRODUCTS: IProductViewModel[] = [
  {
    id: 1,
    name: 'Шапка'
  },
  {
    id: 2,
    name: 'Брюки'
  }
]
