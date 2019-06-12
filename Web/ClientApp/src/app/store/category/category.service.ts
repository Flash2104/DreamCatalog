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
