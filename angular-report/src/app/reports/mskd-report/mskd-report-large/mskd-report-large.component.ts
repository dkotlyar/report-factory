import { Component, OnInit } from '@angular/core';
import {PagesFactory} from 'report-lib';
import {DataService} from '../../../services/data.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-mskd-report-large',
  templateUrl: './mskd-report-large.component.html',
  styleUrls: ['./mskd-report-large.component.css']
})
export class MskdReportLargeComponent implements OnInit {

  pagesFactories: Array<PagesFactory>;
  error;

  startTime: Date;
  endTime: Date;

  constructor(private dataService: DataService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.pagesFactories = [];

    this.dataService.getReportData(id)
        .then(data => {
            for (let i = 0; i < 600; i++) {
                const pf = new PagesFactory(data);
                this.pagesFactories.push(pf);
                pf.splitPages();
                this.startTime = new Date();
            }
            setTimeout(() => {
              this.checkComplited();
          });
        })
        .catch(e => this.error = e);
  }

  checkComplited(): void {
      const compl = this.complited;

      if (this.endTime === undefined && compl === true) {
          this.endTime = new Date();
          const millis = this.endTime.getTime() - this.startTime.getTime();
          console.log('Execute time:', millis / 1000, ' s');
      } else {
          setTimeout(() => {
              this.checkComplited();
          }, 15);
      }
  }

  get complited(): boolean {
    return this.pagesFactories
        .map(p => p.completed)
        .reduce((a, b) => a && b, true);
  }
}
