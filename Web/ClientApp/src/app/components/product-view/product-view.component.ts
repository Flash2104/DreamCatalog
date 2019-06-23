import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseDestroyComponent } from '../BaseDestroyComponent';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppStore } from 'src/app/store/storeRootModule';
import { ProductLoadAction, ProductInitAction, ProductAddChangeAction, ProductCancelChangesAction, ProductCreateAction, ProductUpdateAction } from 'src/app/store/product/product.actions';
import { filter } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CloseDialogComponent } from '../common/close-dialog/close-dialog.component';
import { IProductValidateError, IProductUpdateRequestModel } from 'src/app/store/product/product.model';
import { RouteService } from 'src/app/services/route.service';
import { NotificationComponent } from '../common/notifications/notification.component';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent extends BaseDestroyComponent implements OnInit {
  default = require('src/assets/default.jpg');
  requiredMessage: string = "Поле не должно быть пустым";

  productId?: number;
  categoryId: number;
  isChanged: boolean;
  isCreate: boolean;
  imageBase64: string;
  errors: IProductValidateError[] = [];

  titleFormControl: FormControl;
  priceFormControl: FormControl;
  quantityFormControl: FormControl;
  imageFormControl: FormControl;

  productForm: FormGroup;

  store$ = this._store.select(s => s.productModuleStore);

  constructor(
    private _routeSrv: RouteService,
    private route: ActivatedRoute,
    private _store: Store<IAppStore>,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit() {
    this.route.parent.paramMap
      .pipe(this.takeUntilDestroyed())
      .subscribe(pm => {
        this.categoryId = +pm.get('categoryId');
      });

    this.route.paramMap
      .pipe(this.takeUntilDestroyed())
      .subscribe(pm => {
        this.productId = +pm.get('productId') || null;
        this.isCreate = !this.productId;
        if (this.isCreate) {
          this._store.dispatch(new ProductInitAction());
        } else {
          this._store.dispatch(new ProductLoadAction(+this.productId));
        }
      });

    this.titleFormControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.priceFormControl = new FormControl(null, [Validators.required, this.validateNumber]);
    this.quantityFormControl = new FormControl(null, [Validators.required, this.validateNumber, this.validateInteger]);
    this.imageFormControl = new FormControl(null);

    this.productForm = new FormGroup({
      title: this.titleFormControl,
      price: this.priceFormControl,
      quantity: this.quantityFormControl,
      image: this.imageFormControl
    });

    this.productForm.valueChanges.pipe(this.takeUntilDestroyed()).subscribe((product) => {
      this._store.dispatch(new ProductAddChangeAction(product));
    })

    this.imageFormControl.valueChanges.pipe(this.takeUntilDestroyed()).subscribe((im) => {
      console.log('image', im);
    })

    this.store$
      .pipe(
        this.takeUntilDestroyed(),
        filter(st => st.changed !== null)
      ).subscribe(st => {
        this.isChanged = st.isChanged;
        const patchedValue = { ...st.changed, image: this.imageFormControl.value };
        this.productForm.patchValue(patchedValue, { emitEvent: false });
        if(!!st.notifications && st.notifications.length > 0) {
            this._snackBar.openFromComponent(NotificationComponent,{ verticalPosition: 'bottom', horizontalPosition: 'right', duration: 3000, data: {message: st.notifications.pop()}})
        }
      });
  }

  private validateNumber(control: FormControl): { [key: string]: boolean } {
    if (!!control.value && (isNaN(control.value))) {
      return { 'numberKey': true };
    }
    return null;
  }

  private validateInteger(control: FormControl): { [key: string]: boolean } {
    if (!!control.value && (!Number.isInteger(+control.value))) {
      return { 'integer': true };
    }
    return null;
  }

  onSave() {
    if (this.productForm.valid) {
      const request: IProductUpdateRequestModel = { ...this.productForm.value, categoryId: this.categoryId };
      if (this.isCreate) {
        this._store.dispatch(new ProductCreateAction(request))
      } else {
        request.id = this.productId;
        this._store.dispatch(new ProductUpdateAction(request))
      }
    }
  }

  onCancelChanges() {
    this._store.dispatch(new ProductCancelChangesAction());
  }

  onClose() {
    if (this.isChanged) {
      this.openDialog();
    } else {
      this._routeSrv.navigateToCategory(this.categoryId);
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(CloseDialogComponent);

    dialogRef.afterClosed().pipe(this.takeUntilDestroyed()).subscribe(result => {
      if (result) {
        this._routeSrv.navigateToCategory(this.categoryId);
      }
    });
  }
}
