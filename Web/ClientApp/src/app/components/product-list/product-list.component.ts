import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseDestroyComponent } from '../BaseDestroyComponent';
import { IProductViewModel, ProductListRequestModel, ISortRequestModel } from 'src/app/store/product-list/product-list.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { IAppStore } from 'src/app/store/storeRootModule';
import { Store } from '@ngrx/store';
import { ProductListLoadAction, ProductsDeleteAction } from 'src/app/store/product-list/product-list.actions';
import { filter } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material';
import { ToastNotificationComponent } from '../common/toast-notification/toast-notification.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends BaseDestroyComponent implements OnInit, AfterViewInit {

  isLoading: boolean = false;
  page: number = 1;
  volume: number = 5;
  categoryId: number;
  totalElements: number;
  sortColumn: string;
  sortDirection: string;
  displayedColumns: string[] = ['select', 'image', 'title', 'price', 'quantity'];
  dataSource: MatTableDataSource<IProductViewModel>;
  selection = new SelectionModel<IProductViewModel>(true, []);
  store$ = this._store.select(s => s.productListModuleStore);

  @ViewChildren(MatSort) sorts: QueryList<MatSort>;
  sort: MatSort;

  constructor(
    private _store: Store<IAppStore>,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    super();
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(this.takeUntilDestroyed())
      .subscribe(pm => {
        this.categoryId = +pm.get('categoryId');
        this.page = 1;
        this.loadList();
      });

    this.store$
      .pipe(this.takeUntilDestroyed(),
        filter(st => !!st && !!st.listData))
      .subscribe(st => {
        this.totalElements = st.totalElements;
        this.isLoading = st.isLoading;
        this.dataSource = new MatTableDataSource(st.listData);
        this.selection.clear();
        if (!!st.notifications && st.notifications.length > 0) {
          this._snackBar.openFromComponent(ToastNotificationComponent, { verticalPosition: 'bottom', horizontalPosition: 'right', duration: 3000, data: { messages: st.notifications, color: 'green' } })
        }
        if (!!st.errors && !!st.errors.messages && st.errors.messages.length > 0) {
          this._snackBar.openFromComponent(ToastNotificationComponent, { verticalPosition: 'bottom', horizontalPosition: 'right', duration: 3000, data: { messages: st.errors.messages, color: 'red' } })
        }
      });
  }

  public ngAfterViewInit() {
    this.sorts.changes
      .pipe(this.takeUntilDestroyed())
      .subscribe((sorts: QueryList<MatSort>) => {
        this.sort = sorts.first;
        this.sort.sortChange
          .pipe(this.takeUntilDestroyed())
          .subscribe(pm => {
            this.loadList();
          });
      });
  }

  onPageChange($event: any): void {
    this.page = $event;
    this.loadList();
  }

  private loadList() {
    let sorting: ISortRequestModel = null;
    if (!!this.sort) {
      sorting = <ISortRequestModel>{ column: this.sort.active, direction: this.sort.direction };
    }
    let request = new ProductListRequestModel(this.categoryId, sorting, this.page, this.volume);
    this._store.dispatch(new ProductListLoadAction(request));
  }

  delete(): void {
    this._store.dispatch(new ProductsDeleteAction(this.selection.selected.map(s => s.id)));
  }

  isAllSelected() {
    if (!this.dataSource || !this.dataSource.data) {
      return false;
    }
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (!this.dataSource || !this.dataSource.data) {
      return;
    }
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: IProductViewModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
