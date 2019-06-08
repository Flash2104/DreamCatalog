import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseDestroyComponent } from '../BaseDestroyComponent';
import { Observable } from 'rxjs';
import { IProductViewModel } from 'src/app/store/product/product.model';
import { ProductListService } from 'src/app/store/product/product-list.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends BaseDestroyComponent implements OnInit {

  catalogId: number;
  displayedColumns: string[] = ['id', 'title', 'price', 'quantity'];
  dataSource: MatTableDataSource<IProductViewModel>;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private productListService: ProductListService) {
    super();
  }

  ngOnInit() {
    this.route.paramMap
    .pipe(this.takeUntilDestroyed())
    .subscribe(pm => this.catalogId = +pm.get('catalogId'));

    this.productListService.get()
    .pipe(this.takeUntilDestroyed())
    .subscribe(p =>
      {
         this.dataSource = new MatTableDataSource(p);
         this.dataSource.sort = this.sort;
        });
    
  }
}
