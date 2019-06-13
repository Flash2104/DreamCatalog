import { Injectable } from "@angular/core";
import { IProductViewModel, IProductListRequestModel, VOLUME_KEY } from './product-list.model';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductListService {

  constructor() { }

  getList(request: IProductListRequestModel): Observable<IProductViewModel[]> {
    return this.getMock(request);
  }

  setVolume(volume: number): Observable<any> {
    return of(localStorage.setItem(VOLUME_KEY, volume.toString()));
  }

  getVolume(): Observable<number> {
    const volume = localStorage.getItem(VOLUME_KEY);
    if (!!volume) {
      return of(+volume);
    }
    return of(10);
  }

  private getMock(request: IProductListRequestModel): Observable<IProductViewModel[]> {
    const result = PRODUCT_LIST.slice(request.skip, request.skip + request.take);
    return of(result);
  }
}

export const PRODUCT_LIST: IProductViewModel[] = [
  {
    id: 1,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 2,
    title: 'adc',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 3,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 4,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 5,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 6,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 7,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 8,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 9,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 10,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 11,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 12,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 13,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 14,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 15,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 16,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 17,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 18,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 19,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 20,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 21,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 22,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 23,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 24,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 25,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 26,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 27,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 28,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 29,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  },
  {
    id: 30,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1
  }
]
