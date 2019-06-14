import { HttpHeaders } from '@angular/common/http';

export interface IResponse<Dto> {
  success: boolean,
  errors: [],
  data: Dto
}


export const HTTP_HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });
