import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseDestroyComponent } from '../BaseDestroyComponent';
import { IProductViewModel, ProductListRequestModel } from 'src/app/store/product-list/product-list.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { IAppStore } from 'src/app/store/storeRootModule';
import { Store } from '@ngrx/store';
import { ProductListGetVolumeAction, ProductListLoadAction } from 'src/app/store/product-list/product-list.actions';
import { filter } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent extends BaseDestroyComponent implements OnInit {

  page: number = 1;
  volume: number;
  categoryId: number;
  displayedColumns: string[] = ['select', 'id', 'title', 'price', 'quantity'];
  dataSource: MatTableDataSource<IProductViewModel>;
  selection = new SelectionModel<IProductViewModel>(true, []);
  store$ = this._store.select(s => s.productListModuleStore);
  volume$ = this._store.select(s => s.productListModuleStore.volume);

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private _store: Store<IAppStore>,
    private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this._store.dispatch(new ProductListGetVolumeAction());
    
    this.route.paramMap
      .pipe(this.takeUntilDestroyed())
      .subscribe(pm => {
        this.categoryId = +pm.get('categoryId');
        this.loadList();
      });

    this.volume$
      .pipe(this.takeUntilDestroyed(),
        filter(st => !!st))
      .subscribe(v => {
        this.volume = v;
        this.loadList();
      });

    this.store$
      .pipe(this.takeUntilDestroyed(),
        filter(st => !!st && !!st.list))
      .subscribe(p => {
        this.dataSource = new MatTableDataSource(p.list);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  private loadList() {
    let request = new ProductListRequestModel(this.categoryId, this.page, this.volume);
    this._store.dispatch(new ProductListLoadAction(request));
  }

  delete() : void {
    let message = 'Удалены объекты: \n';
    this.selection.selected.forEach(s => message += s.id.toString() + ' - ' + s.title + ';\n')
    window.alert(message);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IProductViewModel): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
