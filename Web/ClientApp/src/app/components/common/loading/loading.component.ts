import { Component, OnInit, Input } from "@angular/core";
import { BaseDestroyComponent } from '../../BaseDestroyComponent';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent extends BaseDestroyComponent implements OnInit {
  @Input() diameter: number = 40;

  constructor() {
    super();
  }

  ngOnInit() {
  }
}
