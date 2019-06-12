import { Component, OnInit } from '@angular/core';
import { IAppStore } from 'src/app/store/storeRootModule';
import { Store } from '@ngrx/store';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BaseDestroyComponent } from '../BaseDestroyComponent';
import { ICategoryTreeModel } from 'src/app/store/category-tree/category-tree.model';
import { CategoryTreeLoadAction } from 'src/app/store/category-tree/category-tree.actions';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent extends BaseDestroyComponent implements OnInit {

  volume: number;

  store$ = this._store.select(x => x.categoryTreeModuleStore);
  treeControl = new NestedTreeControl<ICategoryTreeModel>(node => node.children);
  dataSource = new MatTreeNestedDataSource<ICategoryTreeModel>();

  constructor(
    private _store: Store<IAppStore>
  ) {
    super();
  }

  ngOnInit() {
    this._store.dispatch(new CategoryTreeLoadAction());
    this.store$
    .pipe(this.takeUntilDestroyed(),
    filter(st => !!st && st.data != null))
    .subscribe(catalogTree => {
      this.dataSource.data = catalogTree.data;
    });
  }

  hasChild = (_: number, node: ICategoryTreeModel) => !!node.children && node.children.length > 0;
}
