import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseDestroyComponent } from '../BaseDestroyComponent';
import { Observable, of } from 'rxjs';
import { IProductListView, IProductViewModel, TEST_PRODUCTS } from 'src/app/store/product/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends BaseDestroyComponent implements OnInit {

  catalogId: number;

  products$: Observable<IProductViewModel[]>;

  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.route.paramMap
    .pipe(this.takeUntilDestroyed())
    .subscribe(pm => this.catalogId = +pm.get('catalogId'));

    this.products$ = of(TEST_PRODUCTS);
  }
}
