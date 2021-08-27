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
import {BaseReportTemplateComponent} from '../../../../../projects/report-lib/src/lib/base-report-template/base-report-template.component';

@Component({
  selector: 'app-lorem-report-template',
  templateUrl: './lorem-report-template.component.html',
  styleUrls: ['./lorem-report-template.component.css']
})
export class LoremReportTemplateComponent extends BaseReportTemplateComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.page.minimumFreeHeight = 100;
  }
}
