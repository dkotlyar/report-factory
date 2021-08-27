import {Component, Input, OnInit} from '@angular/core';
import {BaseReportTemplateComponent} from 'report-lib';

@Component({
  selector: 'app-temp-spec',
  templateUrl: './temp-spec.component.html',
  styleUrls: ['./temp-spec.component.css']
})
export class TempSpecComponent extends BaseReportTemplateComponent   implements OnInit {

  @Input() title: any;
  fakeArray: Array<any>;
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.page.minimumFreeHeight = 20;
  }

  genArray(cnt: number): any[]{
    this.fakeArray = new Array(37 - cnt);
    return this.fakeArray;
  }

  genArray2(): any[]{
    let cnt = this.page.freeHeight / this.page.items[0].height - 1;
    // console.log(this.page.freeHeight, this.page.items[0].height);
    cnt = Math.floor(cnt);
    // console.log(cnt);
    this.fakeArray = []; // new Array(cnt ?? 0);
    return this.fakeArray;
  }

}
