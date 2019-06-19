import { Component, Input, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
selector: 'app-notification',
templateUrl:'./notification.component.html',
styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  message: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) data: any) {
    this.message = data.message;
  }
}
