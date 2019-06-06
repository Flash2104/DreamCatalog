import { OnDestroy } from '@angular/core';
import { ReplaySubject, MonoTypeOperatorFunction } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export abstract class BaseDestroyComponent implements OnDestroy {
  private _destroy$ = new ReplaySubject<boolean>(1);

  protected takeUntilDestroyed<T>(): MonoTypeOperatorFunction<T> {
    return takeUntil(this._destroy$.asObservable());
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}
