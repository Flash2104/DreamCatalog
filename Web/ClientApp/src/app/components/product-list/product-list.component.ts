import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseDestroyComponent } from '../BaseDestroyComponent';
import { Observable } from 'rxjs';
import { IProductViewModel } from 'src/app/store/product-list/product-list.model';
import { ProductListService } from 'src/app/store/product-list/product-list.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { IAppStore } from 'src/app/store/storeRootModule';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends BaseDestroyComponent implements OnInit {

  catalogId: number;
  displayedColumns: string[] = ['id', 'title', 'price', 'quantity'];
  dataSource: MatTableDataSource<IProductViewModel>;
  store$ = this._store.select(s => s.productListModuleStore);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private _store: Store<IAppStore>,
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
