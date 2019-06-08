export interface IProductListView {
  isLoading: boolean;
  isProcessing: boolean;
  isWriting: boolean;

  data: IProductViewModel[];
}

export interface IProductViewModel {
  id: number;
  title: string;
  price: number;
  quantity: number;
}

export interface IProductModel extends IProductViewModel {
}

export interface IProductRequestModel {
  id: number;
}
