export interface ICategoryStateModel {
  isLoading: boolean;
  category: ICategoryModel;

  errors: string[];
}

export interface ICategoryModel {
  id: number;
  name: string;
  description: string;
  parentId: number;
}

export interface ICategoryRequestModel {
  id: number;
}

export const initialState: ICategoryStateModel = {
  isLoading: false,
  category: {
    id: null,
    name: '',
    parentId: null,
    description: ''
  },
  errors: []
};
