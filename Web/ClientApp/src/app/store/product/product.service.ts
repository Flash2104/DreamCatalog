import { Injectable } from "@angular/core";
import { IProductModel, IProductCreateRequestModel, IProductUpdateRequestModel } from './product.model';
import { Observable, of } from 'rxjs';
import { PRODUCT_LIST, PRODUCT_LIST_URL } from '../product-list/product-list.service';
import { IResponse, HTTP_HEADERS } from '../models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { prepareBase64Data } from 'src/app/services/helper';

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor(private _http: HttpClient) {
  }

  get(id: number): Observable<IResponse<IProductModel>> {
    //return this.getMock(id);
    let params = new HttpParams().set('id', id.toString());
    const res$ = this._http.get<IResponse<IProductModel>>(`${PRODUCT_LIST_URL}/get`, { headers: HTTP_HEADERS, params: params });
    return res$.pipe(
      catchError(error => {
        console.log('Server error: ', error);
        return of(<IResponse<IProductModel>>{ data: {}, errors: error, success: false });
      })
    );
  }

  private getMock(id: number) {
    let data = PRODUCT_LIST.find(p => p.id == id);
    return of(data);
  }

  create(request: IProductCreateRequestModel): Observable<IResponse<IProductModel>> {
    if(!!request.image && !!request.image.base64String){
      request.image.base64String = prepareBase64Data(request.image.base64String as string);
    }
    const res$ = this._http.post<IResponse<IProductModel>>(`${PRODUCT_LIST_URL}/create`, request, { headers: HTTP_HEADERS });
    return res$.pipe(
      catchError(error => {
        console.log('Server error: ', error);
        return of(<IResponse<IProductModel>>{ data: {}, errors: error, success: false });
      })
    );
  }

  // private createMock(request: IProductCreateRequestModel) {
  //   var result = { ...request } as IProductModel;
  //   const index = PRODUCT_LIST.length - 1;
  //   result.id = PRODUCT_LIST.sort(p => p.id)[index].id + 1;
  //   PRODUCT_LIST.push(result);
  //   return of(result);
  // }

  update(request: IProductUpdateRequestModel): Observable<IResponse<IProductModel>> {
    if(!!request.image && !!request.image.base64String){
      request.image.base64String = prepareBase64Data(request.image.base64String as string);
    }
    const res$ = this._http.put<IResponse<IProductModel>>(`${PRODUCT_LIST_URL}/update`, request, { headers: HTTP_HEADERS });
    return res$.pipe(
      catchError(error => {
        console.log('Server error: ', error);
        return of(<IResponse<IProductModel>>{ data: {}, errors: error, success: false });
      })
    );
  }

  // private updateMock(request: IProductUpdateRequestModel) {
  //   let data = PRODUCT_LIST.find(p => p.id == request.id);
  //   data.imageId = request.imageId;
  //   data.price = request.price;
  //   data.quantity = request.quantity;
  //   data.title = request.title;
  //   data.categoryId = request.categoryId;
  //   return of(data);
  // }
}
