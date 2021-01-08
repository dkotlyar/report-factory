import {
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Page} from '../../../../../projects/report-lib/src/lib/classes/pojo/page';

@Component({
  selector: 'app-lorem-report-template',
  templateUrl: './lorem-report-template.component.html',
  styleUrls: ['./lorem-report-template.component.css']
})
export class LoremReportTemplateComponent implements OnInit {

  @Input() page: Page;
  @Input() pages: Array<Page>;
  @Input() index: number;

  @ViewChild('pagediv')
  set pagediv(page: ElementRef) {
    this.page.page = page;
  }
  @ViewChild('header')
  set header(header: ElementRef) {
    this.page.header = header;
  }
  @ViewChild('footer')
  set footer(footer: ElementRef) {
    this.page.footer = footer;
  }
  @ViewChildren('content')
  set content(components: QueryList<ElementRef>) {
    this.page.components = components;
    // console.log('change content', this.index);
    this.page.componentsUpdated.emit();
  }

  constructor() { }

  ngOnInit(): void {
    this.page.minimumFreeHeight = 100;
  }
}
