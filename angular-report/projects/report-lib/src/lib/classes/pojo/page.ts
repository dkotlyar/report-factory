import {PageItem} from './page-item';
import {ElementRef, EventEmitter, QueryList, ViewChild, ViewChildren} from '@angular/core';

export class Page {
  content: any;
  items: Array<PageItem> = [];
  freeHeight: number;
  contentHeight: number;
  headerAndFooterHeight: number;

  minimumFreeHeight: number;

  page: ElementRef;
  header: ElementRef;
  footer: ElementRef;
  components: QueryList<ElementRef>;

  componentsUpdated: EventEmitter<null> = new EventEmitter<null>();
}
