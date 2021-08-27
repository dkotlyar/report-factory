import {Component, Input, OnInit, Output} from '@angular/core';
import {PagesFactory} from 'report-lib';

@Component({
  selector: 'app-specification',
  templateUrl: './specification.component.html',
  styleUrls: ['./specification.component.scss']
})
export class SpecificationComponent implements OnInit {

  @Input() report: any;
  pagesFactory: PagesFactory;
  error;
  @Output() title: any;
  constructor() { }

  ngOnInit(): void {
    this.title = this.report.title;
    this.pagesFactory = new PagesFactory(this.report.list);
    this.pagesFactory.splitPages();
    this.pagesFactory.completedEvent.subscribe(() => {
      console.log(this.pagesFactory.pages);
    });
  }

}
