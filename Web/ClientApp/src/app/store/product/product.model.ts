export interface IProductView {
  isLoading: boolean;
  isProcessing: boolean;

  model: IProductModel;
  changes: IProductChange[];
}

export interface IProductModel {
  id: number;
  title: string;
  imageId: number;
  price: number;
  quantity: number;
}

export interface IProductChange {
  propertyName: string;
  oldValue: any;
  newValue: any;
}

export interface IProductCreateRequestModel {
  title: string;
  price: number;
  imageId: number;
  quantity: number;
}

export interface IProductUpdateRequestModel extends IProductCreateRequestModel {
  id: number;
}

export const initialState : IProductView = {
  isLoading: false,
  isProcessing: false,
  model: {
    id: null,
    imageId: null,
    price: null,
    quantity: null,
    title: ''
  },
  changes: []
}
