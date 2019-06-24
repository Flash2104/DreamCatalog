import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { BaseDestroyComponent } from '../components/BaseDestroyComponent';
import { CloseDialogComponent } from '../components/common/close-dialog/close-dialog.component';
import { ProductCancelChangesAction } from '../store/product/product.actions';
import { State, Store } from '@ngrx/store';
import { IAppStore } from '../store/storeRootModule';

@Injectable({ providedIn: 'root' })
export class RouteService extends BaseDestroyComponent {
  constructor(
    private router: Router,
    public dialog: MatDialog,
    private _store: Store<IAppStore>,
    private _state: State<IAppStore>
  ) {
    super();
  }

  navigateToCatalog(checkChanges = false) {
    const commands = ['catalog'];
    this.tryNavigate(commands, checkChanges);
  }

  navigateToCategory(categoryId: number, checkChanges = false) {
    const commands = ['catalog', 'category', categoryId];
    this.tryNavigate(commands, checkChanges);
  }

  navigateToProduct(categoryId: number, productId: number, checkChanges = false) {
    const commands = ['catalog', 'category', categoryId, 'product', productId];
    this.tryNavigate(commands, checkChanges);
  }

  navigateToCreateProduct(categoryId: number, checkChanges = false) {
    const commands = ['catalog', 'category', categoryId, 'product', 'create'];
    this.tryNavigate(commands, checkChanges);
  }

  private onCancelChanges() {
    this._store.dispatch(new ProductCancelChangesAction());
  }

  private tryNavigate(commands: any[], checkChanges: boolean) {
    if (checkChanges && !!this._state.value &&
      !!this._state.value.productModuleStore &&
      this._state.value.productModuleStore.isChanged) {
      const dialogRef = this.dialog.open(CloseDialogComponent);
      dialogRef.afterClosed().pipe(this.takeUntilDestroyed()).subscribe(result => {
        if (result) {
          this.onCancelChanges();
          this.router.navigate(commands);
        }
      });
    } else {
      this.router.navigate(commands);
    }
  }
}
