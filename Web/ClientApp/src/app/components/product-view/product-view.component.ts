import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseDestroyComponent } from '../BaseDestroyComponent';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppStore } from 'src/app/store/storeRootModule';
import { ProductLoadAction, ProductInitAction, ProductAddChangeAction, ProductCancelChangesAction, ProductCreateAction, ProductUpdateAction, ProductCleanUpNotificationsAction, ProductCleanUpErrorsAction } from 'src/app/store/product/product.actions';
import { filter } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { IProductValidateError, IProductUpdateRequestModel, IImageModel, IProductModel } from 'src/app/store/product/product.model';
import { RouteService } from 'src/app/services/route.service';
import { validateNumber, validateInteger } from 'src/app/services/helper';
import { ToastNotificationComponent } from '../common/toast-notification/toast-notification.component';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent extends BaseDestroyComponent implements OnInit {
  requiredMessage: string = "Поле не должно быть пустым";

  productId?: number;
  categoryId: number;
  isChanged: boolean;
  isCreate: boolean;
  image: IImageModel;
  product: IProductModel;
  errors: IProductValidateError[] = [];

  titleFormControl: FormControl;
  priceFormControl: FormControl;
  quantityFormControl: FormControl;

  productForm: FormGroup;

  store$ = this._store.select(s => s.productModuleStore);

  constructor(
    private _routeSrv: RouteService,
    private route: ActivatedRoute,
    private _store: Store<IAppStore>,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private cd: ChangeDetectorRef
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
    this.priceFormControl = new FormControl(null, [Validators.required, validateNumber]);
    this.quantityFormControl = new FormControl(null, [Validators.required, validateNumber, validateInteger]);

    this.productForm = new FormGroup({
      title: this.titleFormControl,
      price: this.priceFormControl,
      quantity: this.quantityFormControl,
    });

    this.productForm.valueChanges.pipe(this.takeUntilDestroyed()).subscribe((product) => {
      product.image = this.image;
      this._store.dispatch(new ProductAddChangeAction(product));
    })

    this.store$
      .pipe(
        this.takeUntilDestroyed(),
        filter(st => !!st && !st.isLoading && !!st.changed)
      ).subscribe(st => {
        this.isChanged = st.isChanged;
        if (!!st.changed) {
          if (!!st.changed.image && !!st.changed.image.base64String) {
            this.image = { ...st.changed.image };
            try {
              btoa(atob(this.image.base64String as string));
              this.image.base64String = 'data:image/jpg;base64,' + this.image.base64String;
            } catch (e) {
            }
          } else {
            this.image = null;
          }
          this.product = { ...st.changed };
          this.productForm.patchValue(this.product, { emitEvent: false });
        }
        if (!!st.notifications && st.notifications.length > 0) {
          this._snackBar.openFromComponent(ToastNotificationComponent, { verticalPosition: 'bottom', horizontalPosition: 'right', duration: 10000, data: { messages: st.notifications, color: 'green' } });
        }
        if (!!st.errors && !!st.errors.messages && st.errors.messages.length > 0) {
          this._snackBar.openFromComponent(ToastNotificationComponent, { verticalPosition: 'bottom', horizontalPosition: 'right', duration: 10000, data: { messages: st.errors.messages, color: 'red', isError: true } });
        }
      });
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.image = {
          id: null,
          title: file.name,
          base64String: reader.result as string
        }
        this.product.image = this.image;
        this._store.dispatch(new ProductAddChangeAction(this.product));
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

  onSave() {
    if (this.productForm.valid) {
      const request: IProductUpdateRequestModel = { ...this.productForm.value, image: this.image, categoryId: this.categoryId };
      if (this.isCreate) {
        this._store.dispatch(new ProductCreateAction(request))
      } else {
        request.id = this.productId;
        this._store.dispatch(new ProductUpdateAction(request))
      }
    }
  }

  onCancelChanges() {
    document.getElementById('image_uploads')['value'] = '';
    this._store.dispatch(new ProductCancelChangesAction());
  }

  onClose() {
    this._routeSrv.navigateToCategory(this.categoryId, true);
  }
}
