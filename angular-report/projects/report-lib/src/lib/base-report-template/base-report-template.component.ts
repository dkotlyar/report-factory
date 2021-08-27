import {Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Page} from '../classes/pojo/page';
import {PagesFactory} from '../classes/pages-factory';
import {PageA4Directive} from '../directives/page-a4.directive';

@Component({
  selector: 'rep-base-report-template',
  templateUrl: './base-report-template.component.html',
  styleUrls: ['./base-report-template.component.css']
})
export class BaseReportTemplateComponent implements OnInit {

  @Input() page: Page;
  @Input() pf: PagesFactory;
  @Input() index: number;

  @ViewChild(PageA4Directive)
  set repPageA4(directive: any) {
    this.page.pageContent = directive.pageContent;
  }

  @ViewChildren('content')
  set content(components: QueryList<ElementRef>) {
    this.page.components = components;
    setTimeout(() => {
      this.page.componentsUpdated.emit();
    });
  }

  constructor() { }

  ngOnInit(): void {
    this.page.minimumFreeHeight = 10;
  }

}
