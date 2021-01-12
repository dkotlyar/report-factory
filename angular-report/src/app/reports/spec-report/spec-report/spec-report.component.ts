import { Component, OnInit } from '@angular/core';
import {SpecService} from '../../../services/spec.service';
import {PagesFactory} from 'report-lib';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-spec-report',
  templateUrl: './spec-report.component.html',
  styleUrls: ['./spec-report.component.css']
})
export class SpecReportComponent implements OnInit {

  pagesFactory: PagesFactory;
  error: HttpErrorResponse;

  constructor(private spec: SpecService) { }

  ngOnInit(): void {
    this.spec.getLocalReportData('gt3660300')
        .then(data => {
          this.pagesFactory = new PagesFactory(data);
          this.pagesFactory.splitPages();
        })
        .catch(e => this.error = e);
  }

  get complited(): boolean {
    return this.pagesFactory.complited;
  }

}
