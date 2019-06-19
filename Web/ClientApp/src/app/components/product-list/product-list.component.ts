import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseDestroyComponent } from '../BaseDestroyComponent';
import { IProductViewModel, ProductListRequestModel, ISortRequestModel } from 'src/app/store/product-list/product-list.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { IAppStore } from 'src/app/store/storeRootModule';
import { Store } from '@ngrx/store';
import { ProductListGetVolumeAction, ProductListLoadAction } from 'src/app/store/product-list/product-list.actions';
import { filter } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { PaginatorComponent } from '../common/paginator/paginator.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends BaseDestroyComponent implements OnInit {

  page: number = 1;
  volume: number = 5;
  categoryId: number;
  totalElements: number;
  totalPages: number;
  sortColumn: string;
  sortDirection: string;
  displayedColumns: string[] = ['select', 'id', 'title', 'price', 'quantity'];
  dataSource: MatTableDataSource<IProductViewModel>;
  selection = new SelectionModel<IProductViewModel>(true, []);
  store$ = this._store.select(s => s.productListModuleStore);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(PaginatorComponent, { static: true }) paginator: PaginatorComponent;

  constructor(
    private _store: Store<IAppStore>,
    private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this._store.dispatch(new ProductListGetVolumeAction());

    this.sort.sortChange
      .pipe(this.takeUntilDestroyed())
      .subscribe(pm => {
        this.loadList();
      });

    this.route.paramMap
      .pipe(this.takeUntilDestroyed())
      .subscribe(pm => {
        this.categoryId = +pm.get('categoryId');
        this.loadList();
      });

    this.store$
      .pipe(this.takeUntilDestroyed(),
        filter(st => !!st && !!st.listData))
      .subscribe(p => {
        this.totalElements = p.totalElements;
        this.initTotalPages();
        this.dataSource = new MatTableDataSource(p.listData);
      });
  }

  private initTotalPages() {
      const isRemainder = this.totalElements % this.volume != 0;
      this.totalPages = isRemainder ? this.totalElements / this.volume | 0 + 1 : (this.totalElements / this.volume) | 0;
  }

  onPageChange($event: any): void {
    this.page = $event;
    this.loadList();
  }

  private loadList() {
    const sorting = <ISortRequestModel>{ column: this.sort.active, direction: this.sort.direction };
    let request = new ProductListRequestModel(this.categoryId, sorting, this.page, this.volume);
    this._store.dispatch(new ProductListLoadAction(request));
  }

  delete(): void {
    let message = 'Удалены объекты: \n';
    this.selection.selected.forEach(s => message += s.id.toString() + ' - ' + s.title + ';\n')
    window.alert(message);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
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
