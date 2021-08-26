import {Component, OnInit} from '@angular/core';
import {BaseReportTemplateComponent, PageItem} from 'report-lib';

@Component({
  selector: 'app-msks-report-template',
  templateUrl: './msks-report-template.component.html',
  styleUrls: ['./msks-report-template.component.css']
})
export class MsksReportTemplateComponent
  extends BaseReportTemplateComponent
  implements OnInit {

  constructor() { super(); }

  ngOnInit(): void {
    this.page.minimumFreeHeight = 40;
  }

  startEtapa(item: PageItem): boolean {
    const kt = item.content.NomerKT;
    const ktInt = +kt;
    return kt !== '' && ktInt !== 99 && ktInt % 2 === 1;
  }

  stopEtapa(item: PageItem): boolean {
    const kt = item.content.NomerKT;
    const ktInt = +kt;
    return kt !== '' && (ktInt === 99 || ktInt % 2 === 0);
  }
}
