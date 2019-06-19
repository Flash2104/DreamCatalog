import { Component, Input, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
selector: 'app-error',
templateUrl:'./error.component.html',
styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  message: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) data: any) {
    this.message = data.message;
  }
}
