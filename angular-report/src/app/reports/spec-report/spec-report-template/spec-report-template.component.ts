import {Component, OnInit} from '@angular/core';
import {BaseReportTemplateComponent, PageItem} from 'report-lib';

@Component({
  selector: 'app-spec-report-template',
  templateUrl: './spec-report-template.component.html',
  styleUrls: ['./spec-report-template.component.css']
})
export class SpecReportTemplateComponent extends BaseReportTemplateComponent implements OnInit {

  completed: boolean;
  private rowHeight;

  constructor() { super(); }

  ngOnInit(): void {
    this.page.minimumFreeHeight = 20;

    setTimeout(() => {
      if (this.page.components.length > 0) {
        this.page.components.first.nativeElement.childNodes.forEach(child => {
          const tagName = (child as HTMLElement).tagName;
          if (tagName !== undefined && tagName.toLowerCase() === 'tr' && this.rowHeight === undefined) {
            this.rowHeight = (child as HTMLElement).offsetHeight;
          }
        });
      }
    }, 100);

    this.pf.completedEvent.subscribe(() => {
      this.completed = true;
    });
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

    return lastItem === undefined || lastItem.content.title !== item.content.title;
  }

  get emptyLines(): Array<number> {
    if (this.page.freeHeight === undefined || this.rowHeight === undefined) {
      return [];
    }

    if (this.rowHeight <= 0) {
      return [];
    } else {
      let arrLen = Math.floor(this.page.freeHeight / this.rowHeight);
      arrLen = Math.max(0, arrLen);
      return new Array(arrLen).fill(this.rowHeight);
    }
  }

  get emptySpace(): string {
    if (this.page.freeHeight === undefined) {
      return '0px';
    }
    return '0px';
    // return (this.page.freeHeight - this.emptyLines.reduce((a, b) => a + b, 0)) + 'px';
    return (this.page.freeHeight - this.emptyLines.reduce((a, b) => a + b, 0)) * 0.26 + 'mm';
    // return 287 - this.emptyLines.length + 'mm';
  }
}
