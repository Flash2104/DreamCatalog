import { Component, OnInit } from "@angular/core";
import { BaseDestroyComponent } from '../../BaseDestroyComponent';

@Component({
    selector: 'app-save-dialog',
    templateUrl: './save-dialog.component.html',
    styleUrls: ['./save-dialog.component.css']
})
export class SaveDialogComponent extends BaseDestroyComponent implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {

    }
}