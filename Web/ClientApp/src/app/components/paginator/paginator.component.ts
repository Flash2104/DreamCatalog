import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BaseDestroyComponent } from '../BaseDestroyComponent';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['/paginator.component.css']
})
export class PaginatorComponent extends BaseDestroyComponent implements OnInit {

    @Input() spanButtons: number;
    @Input() totalElements: number;
    @Input() volume: number = 10;
    @Output() page$: EventEmitter<number> = new EventEmitter(true);


    page: number = 1;
    triggers: any[] = [];
    totalPages: number = 0;
    leftPage: number = 1;
    rightPage: number;

    constructor() {
        super();
    }

    ngOnInit() {
        if (!!this.spanButtons) {
            this.rightPage = this.spanButtons;
        }
        if (!!this.totalElements) {
            const isRemainder = this.totalElements % this.volume != 0;
            this.totalPages = isRemainder ? (this.totalElements / this.volume) + 1 : (this.totalElements / this.volume);
        }
        this.initTriggers();

        this.page$
            .pipe(this.takeUntilDestroyed(), debounceTime(100))
            .subscribe(v => this.page = v);
    }

    private initTriggers() {
        if (this.totalPages <= this.spanButtons) {
            this.fillArray(1, this.totalPages);
        } else {
            this.fillArray(1, this.spanButtons);
        }
    }

    private fillArray(from: number, to: number) {
        this.leftPage = from;
        this.rightPage = to;
        if (from > 1) {
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
        }
    }

    onClick(trigger: any) {
        if (!isNaN(trigger)) {
            this.page$.next(trigger);
        } else {
            if (trigger === 'next') {
                this.page$.next(this.page + 1);
                if (this.page + 1 > this.rightPage) {
                    this.triggers = [];
                    this.fillArray(this.page + 1, this.page + this.spanButtons + 1);
                }
            } else if (trigger === 'prev') {
                this.page$.next(this.page - 1);
                if (this.page - 1 < this.leftPage) {
                    this.triggers = [];
                    this.fillArray(this.page - this.spanButtons - 1, this.page - 1);
                }
            }
        }
    }

    isActive(trigger: any) {
        return this.page === trigger;
    }
}