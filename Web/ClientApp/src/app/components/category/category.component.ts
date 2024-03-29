import { Component, OnInit, ViewChild } from "@angular/core";
import { BaseDestroyComponent } from '../BaseDestroyComponent';
import { IAppStore } from 'src/app/store/storeRootModule';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryLoadAction } from 'src/app/store/category/category.actions';
import { ProductListComponent } from '../product-list/product-list.component';
import { CloseDialogComponent } from '../common/close-dialog/close-dialog.component';
import { MatDialog } from '@angular/material';
import { RouteService } from 'src/app/services/route.service';
import { ProductCancelChangesAction } from 'src/app/store/product/product.actions';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends BaseDestroyComponent implements OnInit {

  categoryName: string;
  categoryId: number;

  isProductChanged: boolean;
  pages: number[];
  store$ = this._store.select(s => s.categoryModuleStore);

  @ViewChild(ProductListComponent, { static: true }) productList: ProductListComponent

  constructor(
    private _routeSrv: RouteService,
    private activatedRoute: ActivatedRoute,
    private _store: Store<IAppStore>,
    public dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {

    this.activatedRoute.paramMap
      .pipe(this.takeUntilDestroyed())
      .subscribe(pm => {
        this.categoryId = +pm.get('categoryId');
        this._store.dispatch(new CategoryLoadAction(this.categoryId));
      });

    this._store.select(s => s.productModuleStore)
      .pipe(this.takeUntilDestroyed())
      .subscribe(st => {
        this.isProductChanged = st.isChanged;
      });
  }

  hasSelected() {
    return !!this.productList.selection && this.productList.selection.selected && this.productList.selection.selected.length > 0;
  }

  onDelete() {
    this.productList.delete();
  }

  onClose() {
      this._routeSrv.navigateToCatalog(true);
  }

  onCreateProduct() {
    this._routeSrv.navigateToCreateProduct(this.categoryId, true);
  }
}
