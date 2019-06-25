import { Component, Inject } from "@angular/core";
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material';
import { IAppStore } from 'src/app/store/storeRootModule';
import { Store } from '@ngrx/store';
import { ProductCleanUpErrorsAction, ProductCleanUpNotificationsAction } from 'src/app/store/product/product.actions';

@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.scss']
})
export class ToastNotificationComponent {
  messages: string[];
  color: string;
  isError: boolean;

  constructor(
    private snackbar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) data: any,
    private _store: Store<IAppStore>
    ) {
    this.messages = data.messages;
    this.color = data.color;
    this.isError = data.isError;
  }

  ngOnInit() {
    if(this.isError){
      this._store.dispatch(new ProductCleanUpErrorsAction());
    } else {
      this._store.dispatch(new ProductCleanUpNotificationsAction());
    }
  }

  onClose() {
    this.snackbar.dismiss();
  }

  ngOnDestroy() {
    this.onClose();
  }
}
