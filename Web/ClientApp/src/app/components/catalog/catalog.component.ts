import { Component, OnInit } from '@angular/core';
import { IAppStore } from 'src/app/store/storeRootModule';
import { Store } from '@ngrx/store';
import { CategoryLoadAllAction } from 'src/app/store/category/category.actions';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ICategoryModel } from 'src/app/store/category/category.model';
import { BaseDestroyComponent } from '../BaseDestroyComponent';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent extends BaseDestroyComponent implements OnInit {

  store$ = this._store.select(x => x.categoryModuleStore);
  treeControl = new NestedTreeControl<ICategoryModel>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ICategoryModel>();

  constructor(
    private _store: Store<IAppStore>
  ) {
    super();
  }

  ngOnInit() {
    this._store.dispatch(new CategoryLoadAllAction());
    this.store$
    .pipe(this.takeUntilDestroyed())
    .subscribe(catalogView => this.dataSource.data = catalogView.data);
  }

  hasChild = (_: number, node: ICategoryModel) => !!node.children && node.children.length > 0;
}
