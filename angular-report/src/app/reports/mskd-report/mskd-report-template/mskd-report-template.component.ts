import { Component, OnInit } from '@angular/core';
import {BaseReportTemplateComponent, PageItem} from 'report-lib';

@Component({
  selector: 'app-mskd-report-template',
  templateUrl: './mskd-report-template.component.html',
  styleUrls: ['./mskd-report-template.component.css']
})
export class MskdReportTemplateComponent
    extends BaseReportTemplateComponent
    implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

}
