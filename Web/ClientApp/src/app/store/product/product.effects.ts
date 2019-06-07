import { Injectable } from "@angular/core";
import { Actions } from '@ngrx/effects';

@Injectable()
export class ProductService {

  constructor(private actions$: Actions, ) { }
}
