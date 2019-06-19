export interface IProductStateModel {
  isLoading: boolean;
  isChanged: boolean;

  product: IProductModel;
  changed: IProductModel;

  notifications: string[];
}

export interface IProductValidateError {
  field: string;
  message: string;
}

export interface IProductModel {
  id: number;
  title: string;
  imageId: number;
  price: number;
  quantity: number;
  categoryId: number;
}

export interface IProductDetailOptions {
   isCreate: boolean;
   id?: number;
   categoryId: number;
}

export interface IProductFieldChange {
  propertyName: string;
  newValue: any;
}

export interface IProductCreateRequestModel {
  title: string;
  price: number;
  imageId: number;
  quantity: number;
  categoryId: number;
}

export interface IProductUpdateRequestModel extends IProductCreateRequestModel {
  id?: number;
}

export const initialState: IProductStateModel = {
  isLoading: false,
  isChanged: false,
  product: {
    id: null,
    imageId: null,
    price: null,
    quantity: null,
    title: '',
    categoryId: null
  },
  changed: {
    id: null,
    imageId: null,
    price: null,
    quantity: null,
    title: '',
    categoryId: null
  },
  notifications: []
}
