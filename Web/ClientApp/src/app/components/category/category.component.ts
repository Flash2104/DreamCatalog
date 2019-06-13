import { Component, OnInit } from "@angular/core";
import { BaseDestroyComponent } from '../BaseDestroyComponent';
import { IAppStore } from 'src/app/store/storeRootModule';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryLoadAction } from 'src/app/store/category/category.actions';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent extends BaseDestroyComponent implements OnInit {

  categoryName: string;
  categoryId: number;
  pages: number[];
  store$ = this._store.select(s => s.categoryModuleStore);

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _store: Store<IAppStore>
  ) {
    super();
  }

  ngOnInit() {

    this.pages = Array.from(Array(10), (x, i) => i + 1);

    this.activatedRoute.paramMap
      .pipe(this.takeUntilDestroyed())
      .subscribe(pm => {
        this.categoryId = +pm.get('categoryId');
        this._store.dispatch(new CategoryLoadAction(this.categoryId));
      });

    // this.router.navigateByUrl(this.router.url + '/products/1');
  }

  onClose() {
    this.router.navigate(['catalog']);
  }
}
