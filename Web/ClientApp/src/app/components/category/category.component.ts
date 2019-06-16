import { Component, OnInit, ViewChild } from "@angular/core";
import { BaseDestroyComponent } from '../BaseDestroyComponent';
import { IAppStore } from 'src/app/store/storeRootModule';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryLoadAction } from 'src/app/store/category/category.actions';
import { ProductListComponent } from '../product-list/product-list.component';
import { CloseDialogComponent } from '../common/close-dialog/close-dialog.component';
import { MatDialog } from '@angular/material';

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
    private router: Router,
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

  onDelete() {
    this.productList.delete();
  }


  onClose() {
    if (this.isProductChanged) {
      this.openDialog();
    } else {
      this.navigateToParent();
    }
  }

  private navigateToParent() {
    this.router.navigate(['catalog']);
  }

  private openDialog() {
    const dialogRef = this.dialog.open(CloseDialogComponent);

    dialogRef.afterClosed().pipe(this.takeUntilDestroyed()).subscribe(result => {
      if (result) {
        this.navigateToParent();
      }
    });
  }
}
