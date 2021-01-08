import {ElementRef} from '@angular/core';

export class PageItem {
  content: any;
  height: number;
  pageNum: number;

  constructor(content: any) {
    this.content = content;
  }
}
