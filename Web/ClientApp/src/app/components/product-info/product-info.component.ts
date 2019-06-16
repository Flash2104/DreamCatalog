import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDestroyComponent } from '../BaseDestroyComponent';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppStore } from 'src/app/store/storeRootModule';
import { ProductLoadAction, ProductInitAction, ProductAddChangeAction, ProductCancelChangesAction, ProductCreateAction, ProductUpdateAction } from 'src/app/store/product/product.actions';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { CloseDialogComponent } from '../common/close-dialog/close-dialog.component';
import { IProductValidateError, IProductCreateRequestModel, IProductUpdateRequestModel } from 'src/app/store/product/product.model';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent extends BaseDestroyComponent implements OnInit {

  requiredMessage: string = "Поле не должно быть пустым";

  productId?: number;
  categoryId: number;
  isChanged: boolean;
  errors: IProductValidateError[] = [];

  titleFormControl: FormControl;
  priceFormControl: FormControl;
  quantityFormControl: FormControl;
  imageFormControl: FormControl;

  productForm: FormGroup;


  store$ = this._store.select(s => s.productModuleStore);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _store: Store<IAppStore>,
    public dialog: MatDialog
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
        if (this.productId) {
          this._store.dispatch(new ProductLoadAction(+this.productId));
        } else {
          this._store.dispatch(new ProductInitAction());
        }
      });

    this.titleFormControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.priceFormControl = new FormControl(null, [Validators.required, this.validateNumber]);
    this.quantityFormControl = new FormControl(null, [Validators.required, this.validateNumber, this.validateInteger]);
    this.imageFormControl = new FormControl();

    this.productForm = new FormGroup({
      title: this.titleFormControl,
      price: this.priceFormControl,
      quantity: this.quantityFormControl,
      imageId: this.imageFormControl
    });

    this.productForm.valueChanges.pipe(this.takeUntilDestroyed()).subscribe((product) => {
      this._store.dispatch(new ProductAddChangeAction(product));
    })

    this.store$
      .pipe(
        this.takeUntilDestroyed(),
        filter(st => st.changed !== null)
      ).subscribe(st => {
        this.isChanged = st.isChanged;
        const patchedValue = { ...st.changed, imageId: this.imageFormControl.value };
        this.productForm.patchValue(patchedValue, { emitEvent: false });
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
      const request: IProductUpdateRequestModel = { ...this.productForm.value };
      if (this.productId) {
        request.id = +this.productId;
        this._store.dispatch(new ProductUpdateAction(request))
      } else {
        this._store.dispatch(new ProductCreateAction(request))
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
      this.navigateToParent();
    }
  }

  private navigateToParent() {
    this.router.navigate(['catalog', 'category', this.categoryId]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CloseDialogComponent);

    dialogRef.afterClosed().pipe(this.takeUntilDestroyed()).subscribe(result => {
      if (result) {
        this.navigateToParent();
      }
    });
  }
}
