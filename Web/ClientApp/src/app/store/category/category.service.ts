import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICategoryModel } from './category.model';
import { TEST_DATA, ICategoryTreeModel } from '../category-tree/category-tree.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {

  constructor() {
  }

  get(id: number): Observable<ICategoryModel> {
    return this.getMock(id);
  }

  private getMock(id: number): Observable<ICategoryModel> {
    return of(this.findCategory(TEST_DATA, id, null));
  }


  private findCategory(data: ICategoryTreeModel[], id: number, parentId: number): ICategoryModel {
    let result: ICategoryModel;
    data.forEach(m => {
      if (m.id === id) {
        result = {
          id: m.id,
          name: m.description,
          description: m.description,
          parentId: parentId
        }
      }
      if (!!m.children) {
        result = this.findCategory(m.children, id, m.id);
      }
    });
    return result;
  }
}
