import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICategoryModel, TEST_DATA, ICategoryRequestModel } from './category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {

  constructor() {
  }

  getAll(): Observable<ICategoryModel[]> {
    return of(TEST_DATA)
  }
}
