import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseDestroyComponent } from '../BaseDestroyComponent';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppStore } from 'src/app/store/storeRootModule';
import { ProductLoadAction } from 'src/app/store/product/product.actions';
import { IProductUpdateRequestModel } from 'src/app/store/product/product.model';
import { filter } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent extends BaseDestroyComponent implements OnInit {

  productTitle: string;
  productId: number;
  categoryId: number;
  titleFormControl: FormControl;
  priceFormControl: FormControl;
  quantityFormControl: FormControl;
  imageFormControl: FormControl;

  productForm: FormGroup;


  store$ = this._store.select(s => s.productModuleStore);

  constructor(
    private loc: Location,
    private router: Router,
    private route: ActivatedRoute,
    private _store: Store<IAppStore>
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
        this.productId = +pm.get('productId');
        this._store.dispatch(new ProductLoadAction(this.productId));
      });

    this.titleFormControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.priceFormControl = new FormControl(Validators.required);
    this.quantityFormControl = new FormControl(Validators.required);
    this.imageFormControl = new FormControl();

    this.productForm = new FormGroup({
      title: this.titleFormControl,
      price: this.priceFormControl,
      quantity: this.quantityFormControl,
      imageId: this.imageFormControl
    });

    this.productForm.valueChanges.pipe(this.takeUntilDestroyed()).subscribe((product: IProductUpdateRequestModel) => {
      console.log('value changed: ' + product);
    })
    this.store$
      .pipe(
        this.takeUntilDestroyed(),
        filter(st => st.product !== null)
      ).subscribe(st => {
        this.productTitle = st.product.title;
        const patchedValue = { ...st.product, imageId: this.imageFormControl.value };
        this.productForm.patchValue(patchedValue, { emitEvent: false });
      });
  }

  onClose() {
    this.router.navigate(['catalog', 'category', this.categoryId]);
  }
}
