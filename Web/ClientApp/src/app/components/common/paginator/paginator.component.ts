import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BaseDestroyComponent } from '../../BaseDestroyComponent';
import { debounceTime, filter } from 'rxjs/operators';
import { IAppStore } from 'src/app/store/storeRootModule';
import { Store } from '@ngrx/store';

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

    this.initTriggers();

    this.page$
      .pipe(this.takeUntilDestroyed(), debounceTime(100))
      .subscribe(v => {
        this.page = v;
        this.count = v * this.volume;
      });
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
      this.triggers.push('first');
      this.triggers.push('prev');
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
      this.triggers.push('next');
      this.triggers.push('last');
    }
  }

  onClick(trigger: any) {
    if (!isNaN(trigger)) {
      this.page$.next(trigger);
    } else {
      if (trigger === 'next') {
        this.page$.next(this.page + 1);
        if (this.page + 1 > this.rightPage) {
          this.fillArray(this.page + 1, this.page + this.spanButtons + 1);
        }
      } else if (trigger === 'prev') {
        this.page$.next(this.page - 1);
        if (this.page - 1 < this.leftPage) {
          this.fillArray(this.page - this.spanButtons - 1, this.page - 1);
        }
      } else if (trigger === 'first') {
        this.goFirst();
      } else if (trigger === 'last') {
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
