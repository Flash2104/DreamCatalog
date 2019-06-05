export interface ICategoryModel {
  id: number;
  title: string;
  description: string;
  children: ICategoryModel[];
}


const TEST_DATA: ICategoryModel[] = [
  {
    id: 1,
    title: 'Fruit',
    description: '',
    children: [
      {
        id: 4,
        title: 'Apple',
        description: '',
        children: []
      },
      {
        id: 5,
        title: 'Banana',
        description: '',
        children: []
      },
      {
        id: 6,
        title: 'Fruit loops',
        description: '',
        children: []
      },
    ]
  },
  {
    id: 2,
    title: 'Vegetables',
    description: '',
    children: [
      {
        id: 7,
        title: 'Green',
        description: '',
        children: [
          {
            id: 8,
            title: 'Broccoli',
            description: '',
            children: []
          },
          {
            id: 9,
            description: '',
            title: 'Brussel sprouts',
            children: []
          },
        ]
      },
      {
        id: 3,
        title: 'Orange',
        description: '',
        children: [
          {
            id: 10,
            title: 'Pumpkins',
            description: '',
            children: []
          },
          {
            id: 11,
            description: '',
            title: 'Carrots',
            children: []
          },
        ]
      },
    ]
  },
];
