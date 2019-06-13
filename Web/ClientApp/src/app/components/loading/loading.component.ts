import { Component, OnInit } from "@angular/core";
import { BaseDestroyComponent } from '../BaseDestroyComponent';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent extends BaseDestroyComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }
}
