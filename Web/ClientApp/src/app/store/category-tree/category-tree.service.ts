import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICategoryTreeModel, TEST_DATA } from './category-tree.model';
import { HttpClient } from '@angular/common/http';
import { IResponse, HTTP_HEADERS } from '../models';
import { CATEGORY_URL } from '../category/category.service';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({ providedIn: 'root' })
export class CategoryTreeService {

  constructor(private _http: HttpClient) {
  }

  getAll(): Observable<IResponse<ICategoryTreeModel[]>> {
    const res$ = this._http.get<IResponse<ICategoryTreeModel[]>>(`${CATEGORY_URL}/get-tree`, {
      headers: HTTP_HEADERS
    })
    return res$.pipe(
      catchError(error => {
        console.log('Server error: ', error);
        return of(<IResponse<any>>{ data: {}, errors: error, success: false });
      })
    );
  }
}
