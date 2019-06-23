import { HttpHeaders } from '@angular/common/http';

export interface IResponse<Dto> {
  success: boolean,
  errors: [],
  data: Dto
}

export interface IBaseStateModel {
  notifications: string[];
  errors: {
    messages: string[]
  }
}

export const HTTP_HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });
