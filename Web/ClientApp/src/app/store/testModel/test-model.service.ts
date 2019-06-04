import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ITestModelLoadRequest, ITestModel } from './test-model.model';

@Injectable({ providedIn: 'root' })
export class TestItemService {
  constructor() {
  }

  get(request: ITestModelLoadRequest): Observable<ITestModel> {
    const result: ITestModel = {
      id: request.id,
      counter: 10,
      title: 'Foo'
    };
    return of(result);
  }

}
