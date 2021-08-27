import {Component, Input, OnInit} from '@angular/core';
import {BaseReportTemplateComponent, PageItem} from 'report-lib';

@Component({
  selector: 'app-spec-table',
  templateUrl: './spec-table.component.html',
  styleUrls: ['./spec-table.component.css']
})
export class SpecTableComponent extends BaseReportTemplateComponent   implements OnInit {

@Input() title: any;
  fakeArray: Array<PageItem>;
  constructor() {
    super();
  }

  ngOnInit(): void {
    this.page.minimumFreeHeight = 5;
  }

  genArray(items: PageItem[]): any[]{
    if (items.length !== 34) {
      for (let i = 0, len = (34 - items.length); i < len; ++i) {
        items.push(items[0]);
      }
    }
    this.fakeArray = items;
    return this.fakeArray;
  }

  genArray2(): any[]{
    let cnt = this.page.freeHeight / this.page.items[0].height - 1;
    console.log(this.page.freeHeight, this.page.items[0].height);
    cnt = Math.floor(cnt);
    console.log(cnt);
    this.fakeArray = new Array(cnt || 0);
    return this.fakeArray;
  }


}
