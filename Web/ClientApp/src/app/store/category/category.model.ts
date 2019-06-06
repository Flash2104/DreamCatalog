
export interface ICategoryTreeView {
  isLoading: boolean;
  isProcessing: boolean;
  isWriting: boolean;

  data: ICategoryModel[];
}

export interface ICategoryModel {
  id: number;
  name: string;
  description: string;
  children: ICategoryModel[];
}

export interface ICategoryRequestModel {
  id: number;
}

export const initialState: ICategoryTreeView = {
  isLoading: false,
  isProcessing: false,
  isWriting: false,
  data: []
};

export const TEST_DATA: ICategoryModel[] = [
  {
    id: 1,
    name: 'Fruit',
    description: '',
    children: [
      {
        id: 4,
        name: 'Apple',
        description: '',
        children: []
      },
      {
        id: 5,
        name: 'Banana',
        description: '',
        children: []
      },
      {
        id: 6,
        name: 'Fruit loops',
        description: '',
        children: []
      },
    ]
  },
  {
    id: 2,
    name: 'Vegetables',
    description: '',
    children: [
      {
        id: 7,
        name: 'Green',
        description: '',
        children: [
          {
            id: 8,
            name: 'Broccoli',
            description: '',
            children: []
          },
          {
            id: 9,
            description: '',
            name: 'Brussel sprouts',
            children: []
          },
        ]
      },
      {
        id: 3,
        name: 'Orange',
        description: '',
        children: [
          {
            id: 10,
            name: 'Pumpkins',
            description: '',
            children: []
          },
          {
            id: 11,
            description: '',
            name: 'Carrots',
            children: []
          },
        ]
      },
    ]
  },
];
