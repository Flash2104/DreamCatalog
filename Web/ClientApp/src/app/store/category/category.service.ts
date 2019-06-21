import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ICategoryModel } from './category.model';
import { TEST_DATA, ICategoryTreeModel } from '../category-tree/category-tree.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HTTP_HEADERS, IResponse } from '../models';
import { catchError } from 'rxjs/internal/operators/catchError';

export const CATEGORY_URL = 'api/category';


@Injectable({ providedIn: 'root' })
export class CategoryService {

  constructor(private _http: HttpClient) {
  }

  get(id: number): Observable<IResponse<ICategoryModel>> {
    let params = new HttpParams().set('id', id.toString());
    const res$ = this._http.get<IResponse<ICategoryModel>>(`${CATEGORY_URL}/get`, {headers: HTTP_HEADERS, params: params});
    return res$.pipe(
      catchError(error => {
        console.log('Server error: ', error);
        return of(<IResponse<any>>{ data: {}, errors: error, success: false });
      })
    );
  }

  private getMock(id: number): Observable<ICategoryModel> {
    let result = new Subject<ICategoryModel>();
    setTimeout(() =>{ result.next(this.findCategory(TEST_DATA, id, null))}, 3000);
    return result;
  }


  private findCategory(data: ICategoryTreeModel[], id: number, parentId: number): ICategoryModel {
    let result: ICategoryModel;
    for(let i=0; i<data.length; i++){
      if (data[i].id === id) {
        result = {
          id: data[i].id,
          name: data[i].name,
          description: data[i].description,
          parentId: parentId
        }
        break;
      }
      if (!!data[i].children && data[i].children.length > 0) {
        result = this.findCategory(data[i].children, id, data[i].id);
        if(!!result){
          break;
        }
      }
    }
    return result;
  }
}
