export interface ICategoryStateModel {
  isLoading: boolean;
  isProcessing: boolean;
  data: ICategoryModel;
}

export interface ICategoryModel {
  id: number;
  name: string;
  description: string;
  parentId: number;
}

export const initialState: ICategoryStateModel = {
  isLoading: false,
  isProcessing: false,
  data: {
    id: null,
    name: '',
    description: '',
    parentId: null
  }
};