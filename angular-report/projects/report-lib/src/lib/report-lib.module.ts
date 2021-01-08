import { NgModule } from '@angular/core';
import { ReportLibComponent } from './report-lib.component';
import {BaseReportTemplateComponent} from './base-report-template/base-report-template.component';
import { ErrorPageComponent } from './error-page/error-page.component';



@NgModule({
  declarations: [
    ReportLibComponent,
    BaseReportTemplateComponent,
    ErrorPageComponent
  ],
  imports: [
  ],
  exports: [
    ReportLibComponent,
    BaseReportTemplateComponent,
    ErrorPageComponent
  ]
})
export class ReportLibModule { }
