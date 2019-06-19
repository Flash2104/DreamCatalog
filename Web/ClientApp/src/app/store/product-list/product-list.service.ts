import { Injectable } from "@angular/core";
import { IProductViewModel, IProductListRequestModel, VOLUME_KEY, IProductListResponseModel } from './product-list.model';
import { Observable, of } from 'rxjs';
import { IResponse, HTTP_HEADERS } from '../models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductListService {
  private productListUrl = 'api/product-list';

  constructor(
    private _http: HttpClient
  ) { }

  getList(request: IProductListRequestModel): Observable<IProductListResponseModel> {
    return this.getMock(request);
  }

  delete(request: number[]): Observable<IResponse<any>> {
    const res$ = this._http.request<IResponse<any>>('DELETE', `${this.productListUrl}/delete`, {
      headers: HTTP_HEADERS,
      body: request
    })
    return res$;
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

  private getMock(request: IProductListRequestModel): Observable<IProductListResponseModel> {
    let list: IProductViewModel[] =  PRODUCT_LIST.slice();

    if (!!request.sort) {
      const col = request.sort.column;
      const dir = request.sort.direction;
      const sortFunc = (a: IProductViewModel, b: IProductViewModel): number => {
        if (dir === 'asc') {
          if (a[col] > b[col]) {
            return 1;
          } else if (a[col] === b[col]) {
            return 0;
          } else {
            return -1;
          }
        } else {
          if (a[col] > b[col]) {
            return -1;
          } else if (a[col] === b[col]) {
            return 0;
          } else {
            return 1;
          }
        }
      }
      if (dir !== '') {
        list = PRODUCT_LIST.sort((a, b) => sortFunc(a, b));
      }
    }
    const skip = (request.page - 1) * request.take;
    const paged = list.slice(skip, skip + request.take)
    const result = {
      list: paged,
      totalElements: PRODUCT_LIST.length
    } as IProductListResponseModel;
    return of(result);
  }
}

export const PRODUCT_LIST: IProductViewModel[] = [
  {
    id: 1,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 2,
    title: 'adc',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 3,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 4,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 5,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 6,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 7,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 8,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 9,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 10,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 11,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 12,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 13,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 14,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 15,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 16,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 17,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 18,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 19,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 20,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 21,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 22,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 23,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 24,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 25,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 26,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 27,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 28,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 29,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  },
  {
    id: 30,
    title: 'Shoes loern',
    price: 60.00,
    quantity: 10,
    imageId: 1,
    categoryId: 1
  }
]
