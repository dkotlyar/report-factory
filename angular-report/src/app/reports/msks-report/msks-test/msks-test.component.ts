import { Component, OnInit } from '@angular/core';
import {PagesFactory} from 'report-lib';
import {MsksService} from '../../../services/msks.service';

@Component({
  selector: 'app-msks-test',
  templateUrl: './msks-test.component.html',
  styleUrls: ['./msks-test.component.css']
})
export class MsksTestComponent implements OnInit {

  pagesFactories: Array<PagesFactory>;
  error;

  constructor(private msks: MsksService) {
  }

  ngOnInit(): void {
    this.pagesFactories = [];

    this.msks.getLocalReportData('925-20-1283')
      .then(data => {
        const pf = new PagesFactory(data);
        this.pagesFactories.push(pf);
        pf.splitPages();
      })
      .catch(e => this.error = e);
  }

  get complited(): boolean {
    return this.pagesFactories
      .map(p => p.complited)
      .reduce((a, b) => a && b, true);
  }

}
