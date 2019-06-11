import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseDestroyComponent } from '../BaseDestroyComponent';
import { IProductViewModel, ProductListRequestModel } from 'src/app/store/product-list/product-list.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { IAppStore } from 'src/app/store/storeRootModule';
import { Store } from '@ngrx/store';
import { ProductListLoadAction } from 'src/app/store/product-list/product-list.actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends BaseDestroyComponent implements OnInit {

  categoryTitle: string;
  displayedColumns: string[] = ['id', 'title', 'price', 'quantity'];
  dataSource: MatTableDataSource<IProductViewModel>;
  store$ = this._store.select(s => s.productListModuleStore);

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
        // const categoryId = +pm.get('categoryId');
        // const page = +pm.get('page');
        const data = pm.get('data');
        // const request = new ProductListRequestModel(categoryId, page);
        // this._store.dispatch(new ProductListLoadAction(request));
      });



    this.store$
      .pipe(this.takeUntilDestroyed(),
        filter(st => st.list !== null))
      .subscribe(p => {
        this.dataSource = new MatTableDataSource(p.list);
        this.dataSource.sort = this.sort;
        this.categoryTitle = p.category.name;
      });

  }
}
