import {Component, OnInit} from '@angular/core';
import {BaseReportTemplateComponent, PageItem} from 'report-lib';

@Component({
  selector: 'app-spec-report-template',
  templateUrl: './spec-report-template.component.html',
  styleUrls: ['./spec-report-template.component.css']
})
export class SpecReportTemplateComponent extends BaseReportTemplateComponent implements OnInit {

  private rowHeight;

  constructor() { super(); }

  ngOnInit(): void {
    this.page.minimumFreeHeight = 20;

    setTimeout(() => {
      this.page.components.first.nativeElement.childNodes.forEach(child => {
        const tagName = (child as HTMLElement).tagName;
        if (tagName !== undefined && tagName.toLowerCase() === 'tr' && this.rowHeight === undefined) {
          this.rowHeight = (child as HTMLElement).offsetHeight;
        }
      });
    }, 100);
  }

  startGroup(item: PageItem, index: number): boolean {
    let lastItem;

    if (index === 0) {
      if (this.index > 0) {
        lastItem = this.pf.pages[this.index - 1].items[this.pf.pages[this.index - 1].items.length - 1];
      }
    } else {
      lastItem = this.page.items[index - 1];
    }

    return lastItem === undefined || lastItem.content.CLASSIF !== item.content.CLASSIF;
  }

  get emptyLines(): Array<number> {
    if (this.page.freeHeight === undefined || this.rowHeight === undefined) {
      return [];
    }

    if (this.rowHeight <= 0) {
      return [];
    } else {
      let arrLen = Math.floor(this.page.freeHeight / this.rowHeight);
      arrLen = Math.max(0, arrLen - 1);
      return new Array(arrLen).fill(this.rowHeight);
    }
  }

  get emptySpace(): number {
    if (this.page.freeHeight === undefined) {
      return 0;
    }
    return this.page.freeHeight - this.emptyLines.reduce((a, b) => a + b, 0);
  }
}
