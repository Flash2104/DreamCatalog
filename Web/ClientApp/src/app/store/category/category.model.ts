export interface ICategoryStateModel {
  isLoading: boolean;
  category: ICategoryModel;
}

export interface ICategoryModel {
  id: number;
  name: string;
  description: string;
  parentId: number;
}

export const initialState: ICategoryStateModel = {
  isLoading: false,
  category: null
};