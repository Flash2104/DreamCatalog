import { Injectable } from "@angular/core";
import { IProductModel, IProductCreateRequestModel, IProductUpdateRequestModel } from './product.model';
import { Observable, of } from 'rxjs';
import { PRODUCT_LIST } from '../product-list/product-list.service';

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor() {
  }

  get(id: number): Observable<IProductModel> {
    let data = PRODUCT_LIST.find(p => p.id == id);
    return of(data);
  }

  create(request: IProductCreateRequestModel): Observable<IProductModel> {
    var result = { ...request } as IProductModel;
    const index = PRODUCT_LIST.length - 1;
    result.id = PRODUCT_LIST.sort(p => p.id)[index].id + 1;
    PRODUCT_LIST.push(result);
    return of(result);
  }

  update(request: IProductUpdateRequestModel): Observable<IProductModel> {
    let data = PRODUCT_LIST.find(p => p.id == request.id);
    data.imageId = request.imageId;
    data.price = request.price;
    data.quantity = request.quantity;
    data.title = request.title;
    data.categoryId = request.categoryId;
    return of(data);
  }
}
