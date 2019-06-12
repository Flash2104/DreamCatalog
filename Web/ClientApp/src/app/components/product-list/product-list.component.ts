import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseDestroyComponent } from '../BaseDestroyComponent';
import { IProductViewModel, ProductListRequestModel } from 'src/app/store/product-list/product-list.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { IAppStore } from 'src/app/store/storeRootModule';
import { Store } from '@ngrx/store';
import { ProductListLoadAction, ProductListGetVolumeAction } from 'src/app/store/product-list/product-list.actions';
import { filter } from 'rxjs/operators';
import { CategoryLoadAction } from 'src/app/store/category/category.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends BaseDestroyComponent implements OnInit {

  page: number;
  volume: number;
  displayedColumns: string[] = ['id', 'title', 'price', 'quantity'];
  dataSource: MatTableDataSource<IProductViewModel>;
  listStore$ = this._store.select(s => s.productListModuleStore);
  categoryStore$ = this._store.select(s => s.categoryModuleStore);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _store: Store<IAppStore>,
    private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {

    this.route.paramMap
      .pipe(this.takeUntilDestroyed())
      .subscribe(pm => {
        const categoryId = +pm.get('categoryId');
        this.page = +pm.get('page');
        this._store.dispatch(new CategoryLoadAction(categoryId));
        this._store.dispatch(new ProductListGetVolumeAction());
      });

    this.categoryStore$
      .pipe(this.takeUntilDestroyed(),
        filter(st => !!st && st.data !== null))
      .subscribe(st => {
        const request = new ProductListRequestModel(st.data, this.page, this.volume);
        this._store.dispatch(new ProductListLoadAction(request));
      });

    // this.volume$
    //   .pipe(this.takeUntilDestroyed(),
    //     filter(st => st !== null))
    //   .subscribe(st => {
    //     this.volume = st;
    //   });

    this.listStore$
      .pipe(this.takeUntilDestroyed(),
        filter(st => !!st && st.list !== null))
      .subscribe(p => {
        this.dataSource = new MatTableDataSource(p.list);
        this.dataSource.sort = this.sort;
        this.volume = p.volume;
      });
  }
}
