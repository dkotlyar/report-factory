import { Component, OnInit } from '@angular/core';
import {PagesFactory} from 'report-lib';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../services/data.service';

@Component({
  selector: 'app-report-spec',
  templateUrl: './report-spec.component.html',
  styleUrls: ['./report-spec.component.scss']
})
export class ReportSpecComponent implements OnInit {

  pagesFactory: PagesFactory;
  report: any;
  error;
  constructor(private dataService: DataService,
              private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.dataService.getLocalReportJson('spec.json')
      .then(data => {
        this.report = data.list;
      })
      .catch(e => this.error = e);
  }

}
