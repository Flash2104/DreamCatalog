import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseDestroyComponent } from '../BaseDestroyComponent';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppStore } from 'src/app/store/storeRootModule';
import { ProductLoadAction, ProductInitAction, ProductAddChangeAction, ProductCancelChangesAction, ProductCreateAction, ProductUpdateAction } from 'src/app/store/product/product.actions';
import { filter } from 'rxjs/operators';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CloseDialogComponent } from '../common/close-dialog/close-dialog.component';
import { IProductValidateError, IProductUpdateRequestModel, IImageModel } from 'src/app/store/product/product.model';
import { RouteService } from 'src/app/services/route.service';
import { NotificationComponent } from '../common/notifications/notification.component';
import { validateFileTypes, validateNumber, validateInteger } from 'src/app/services/helper';

declare var require: any

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
  imageId: number;
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
    this.imageFormControl = new FormControl(null, [validateFileTypes(['png', 'jpg', 'jpeg'])]);

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
        if (!!st.changed) {
          const patchedValue = { ...st.changed };
          this.productForm.patchValue(patchedValue, { emitEvent: false });
          if (!!st.changed.image && !!st.changed.image.base64String) {
            try {
              btoa(atob(st.changed.image.base64String as string));
              this.imageBase64 = 'data:image/jpg;base64,' + st.changed.image.base64String;
            } catch (e) {
              this.imageBase64 = st.changed.image.base64String;
            }
          } else {
            this.imageBase64 = null;
          }
        }
        if (!!st.notifications && st.notifications.length > 0) {
          this._snackBar.openFromComponent(NotificationComponent, { verticalPosition: 'bottom', horizontalPosition: 'right', duration: 3000, data: { message: st.notifications.pop() } })
        }
      });
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageBase64 = reader.result as string;
        const model: IImageModel = {
          id: null,
          title: file.name,
          base64String: reader.result as string
        }
        this.imageFormControl.patchValue(model, { emitEvent: true });

        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
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
        this.onCancelChanges();
        this._routeSrv.navigateToCategory(this.categoryId);
      }
    });
  }
}
