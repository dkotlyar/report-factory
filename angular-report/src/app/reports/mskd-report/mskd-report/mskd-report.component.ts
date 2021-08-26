import { Component, OnInit } from '@angular/core';
import {PagesFactory} from 'report-lib';
import {DataService} from '../../../services/data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-mskd-report',
  templateUrl: './mskd-report.component.html',
  styleUrls: ['./mskd-report.component.css']
})
export class MskdReportComponent implements OnInit {

  pagesFactories: Array<PagesFactory>;
  error;

  constructor(private dataService: DataService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.pagesFactories = [];

    this.dataService.getReportData(id)
      .then(data => {
        const pf = new PagesFactory(data);
        this.pagesFactories.push(pf);
        pf.splitPages();
      })
      .catch(e => this.error = e);
  }

  get complited(): boolean {
    return this.pagesFactories
      .map(p => p.completed)
      .reduce((a, b) => a && b, true);
  }
}
