import { Injectable } from "@angular/core";
import { IProductViewModel, IProductListRequestModel } from './product-list.model';
import { Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ProductListService {

  constructor() {  }

  get(request: IProductListRequestModel): Observable<IProductViewModel[]> {
    return of(PRODUCT_LIST);
  }
}

export const PRODUCT_LIST: IProductViewModel[] = [
  {
    id: 1,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 2,
    title: 'adc',
    price: 60.00,
    quantity: 10
  },
  {
    id: 3,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 4,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 5,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 6,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 7,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 8,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 9,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 10,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 11,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 12,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 13,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 14,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 15,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 16,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 17,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 18,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 19,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 20,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 21,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 22,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 23,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 24,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 25,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 26,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 27,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 28,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 29,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  },
  {
    id: 30,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10
  }
]