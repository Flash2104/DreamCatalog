import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BaseDestroyComponent } from '../../BaseDestroyComponent';
import { debounceTime, filter } from 'rxjs/operators';
import { IAppStore } from 'src/app/store/storeRootModule';
import { Store } from '@ngrx/store';

const FIRST_PAGE = 1;

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['/paginator.component.css']
})
export class PaginatorComponent extends BaseDestroyComponent implements OnInit {

  @Input() spanButtons: number = 1;
  @Input() totalElements: number = 1;
  @Input() totalPages: number = 1;
  @Input() volume: number = 10;
  @Output() page$: EventEmitter<number> = new EventEmitter(true);

  page: number = 1;
  count: number;
  triggers: any[] = [];
  leftPage: number = 1;
  rightPage: number;

  store$ = this._store.select(s => s.productListModuleStore);

  constructor(
    private _store: Store<IAppStore>
  ) {
    super();
  }

  ngOnInit() {
    this.count = this.page * this.volume;
    if (!!this.spanButtons) {
      this.rightPage = this.spanButtons;
    }

    this.calculateTotalPages();
    this.initTriggers();

    this.page$
      .pipe(this.takeUntilDestroyed(), debounceTime(100))
      .subscribe(v => {
        this.page = v;
        this.count = v * this.volume;
      });

    this.store$
      .pipe(this.takeUntilDestroyed())
      .subscribe(pl => {
        this.page = pl.currentPage;
        this.totalElements = pl.totalElements;
        this.calculateTotalPages();
        this.fillButtonArray();
      });
  }

  private calculateTotalPages() {
    const isRemainder = this.totalElements % this.volume !== 0;
    this.totalPages = isRemainder ? (this.totalElements / this.volume) + 1 | 0 : this.totalElements / this.volume | 0;
  }

  private fillButtonArray() {
    if (this.page === FIRST_PAGE) {
      this.initTriggers();
    }
    const middle = (this.spanButtons / 2) | 0;
    if (this.page > this.spanButtons) {
      this.fillArray(this.page - middle, this.page + middle);
    }
  }

  private initTriggers() {
    if (this.totalPages <= this.spanButtons) {
      this.fillArray(1, this.totalPages);
    } else {
      this.fillArray(1, this.spanButtons);
    }
  }

  private fillArray(from: number, to: number) {
    this.triggers = [];
    this.leftPage = from;
    this.rightPage = to;
    if (from > 1) {
      this.triggers.push('<<');
      this.triggers.push('<');
    }
    if (from <= 1) {
      from = 1;
    }
    if (to >= this.totalPages) {
      to = this.totalPages;
    }
    for (let i = from; i <= to; i++) {
      this.triggers.push(i);
    }
    if (to < this.totalPages) {
      this.triggers.push('>');
      this.triggers.push('>>');
    }
  }

  onClick(trigger: any) {
    if (!isNaN(trigger)) {
      this.page$.next(trigger);
    } else {
      if (trigger === '>') {
        this.page$.next(this.page + 1);
        if (this.page + 1 > this.rightPage) {
          this.fillArray(this.page + 1, this.page + this.spanButtons + 1);
        }
      } else if (trigger === '<') {
        this.page$.next(this.page - 1);
        if (this.page - 1 < this.leftPage) {
          this.fillArray(this.page - this.spanButtons - 1, this.page - 1);
        }
      } else if (trigger === '<<') {
        this.goFirst();
      } else if (trigger === '>>') {
        this.goLast();
      }
    }
  }

  goLast() {
    this.page$.next(this.totalPages);
    this.fillArray(this.totalPages - this.spanButtons, this.totalPages);
  }

  goFirst() {
    this.page$.next(1);
    this.initTriggers();
  }

  isActive(trigger: any) {
    return this.page === trigger;
  }
}
