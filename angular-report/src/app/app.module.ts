import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoremReportTemplateComponent} from './reports/lorem-report/lorem-report-template/lorem-report-template.component';
import {LoremReportComponent} from './reports/lorem-report/lorem-report/lorem-report.component';
import {RouterModule, Routes} from '@angular/router';
import {MsksReportComponent} from './reports/msks-report/msks-report/msks-report.component';
import {MsksReportTemplateComponent} from './reports/msks-report/msks-report-template/msks-report-template.component';
import {ReportLibModule} from 'report-lib';
import {HttpClientModule} from '@angular/common/http';
import { MsksTestComponent } from './reports/msks-report/msks-test/msks-test.component';
import { ReadmeComponent } from './readme/readme.component';
import { SpecReportComponent } from './reports/spec-report/spec-report/spec-report.component';
import { SpecReportTemplateComponent } from './reports/spec-report/spec-report-template/spec-report-template.component';
import { GostTfootComponent } from './reports/spec-report/gost-tfoot/gost-tfoot.component';
import { SpecTestComponent } from './reports/spec-report/spec-test/spec-test.component';
import {MskdReportComponent} from './reports/mskd-report/mskd-report/mskd-report.component';
import {MskdReportTemplateComponent} from './reports/mskd-report/mskd-report-template/mskd-report-template.component';
import { MskdReportLargeComponent } from './reports/mskd-report/mskd-report-large/mskd-report-large.component';
import { MskdTestComponent } from './reports/mskd-report/mskd-test/mskd-test.component';

const appRoutes: Routes = [
  {path: '', component: ReadmeComponent},
  {path: 'lorem', component: LoremReportComponent},
  {path: 'spec', component: SpecTestComponent},
  {path: 'spec/:id', component: SpecReportComponent},
  {path: 'msks', component: MsksTestComponent},
  {path: 'msks/:id', component: MsksReportComponent},
  {path: 'mskd', component: MskdTestComponent},
  {path: 'mskd/:id', component: MskdReportComponent},
  {path: 'mskd-large/:id', component: MskdReportLargeComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoremReportComponent,
    LoremReportTemplateComponent,
    MsksReportComponent,
    MsksReportTemplateComponent,
    MsksTestComponent,
    ReadmeComponent,
    SpecReportComponent,
    SpecReportTemplateComponent,
    GostTfootComponent,
    SpecTestComponent,
      MskdReportComponent,
      MskdReportTemplateComponent,
      MskdReportLargeComponent,
      MskdTestComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ReportLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
