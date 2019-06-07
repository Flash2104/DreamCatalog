import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseDestroyComponent } from '../BaseDestroyComponent';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent extends BaseDestroyComponent implements OnInit {

  productId: number;

  constructor(private route: ActivatedRoute) {
    super();
   }

  ngOnInit() {

    this.route.paramMap
    .pipe(this.takeUntilDestroyed())
    .subscribe(pm => this.productId = +pm.get('productId'));

  }

}
