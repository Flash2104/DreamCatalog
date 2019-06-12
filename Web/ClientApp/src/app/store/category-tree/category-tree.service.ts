import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICategoryTreeModel, TEST_DATA } from './category-tree.model';

@Injectable({ providedIn: 'root' })
export class CategoryTreeService {

  constructor() {
  }

  getAll(): Observable<ICategoryTreeModel[]> {
    return of(TEST_DATA)
  }
}
