import {Component, HostListener, OnInit} from '@angular/core';
import {MSKS_DATA} from '../../../data/MSKS_DATA';
import {PagesFactory} from 'report-lib';
import {MsksService} from '../../../services/msks.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-msks-report',
  templateUrl: './msks-report.component.html',
  styleUrls: ['./msks-report.component.css', '../../../app.component.css']
})
export class MsksReportComponent implements OnInit {

  pagesFactories: Array<PagesFactory>;
  error;

  constructor(private msks: MsksService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;

    this.pagesFactories = [];

    this.msks.getReportData(id)
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
