import {PageItem} from './page-item';
import {ElementRef, EventEmitter, QueryList, ViewChild, ViewChildren} from '@angular/core';

export class Page {
  // Поле content содержит произвольный объект, переданный в качестве параметра CONTENT в конструктор PagesFactory.
  content: any;

  // Поле items содержит массив PageItem, хранящийся для данной страницы
  items: Array<PageItem> = [];

  // Поле freeHeight содержит высоту свободного места на странице.
  // Может быть использовано в шаблоне для заполнения свободного пространства.
  freeHeight: number;

  // Поле определяет доступную высоту страницы для генерирования отчёта. Вычисляется автоматически для элемента page
  // contentHeight: number;
  // Поле содержит высоту элементов header, footer, а также требуемое свободное место на странице
  // headerAndFooterHeight: number;
  // Требуемое свободное место на странице. Задается в пикселях.
  // Read-Write.
  minimumFreeHeight = 0;

  page: ElementRef;
  components: QueryList<ElementRef>;

  componentsUpdated: EventEmitter<null> = new EventEmitter<null>();

  // Функция вычисляет доступную высоту страницы для генерирования отчёта.
  contentHeight(): number {
    return this.page.nativeElement.getClientRects()[0].height;
  }

  // Функция вычисляет высоту элементов header, footer, а также требуемое свободное место на странице
  headerAndFooterHeight(): number[] {
    const pagediv = this.page.nativeElement;
    const first = this.components.first.nativeElement;
    const last = this.components.last.nativeElement;
    const firstRect = first.getClientRects()[0];
    const lastRect = last.getClientRects()[0];
    const headerHeight = firstRect.top - pagediv.getClientRects()[0].top;
    const footerHeight = pagediv.lastChild.getClientRects()[0].bottom - (lastRect.bottom);
    return [headerHeight, footerHeight, (this.minimumFreeHeight || 0)];
  }
}
