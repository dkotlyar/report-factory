import { Component, OnInit } from '@angular/core';
import {PagesFactory} from "report-lib";
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-mskd-test',
  templateUrl: './mskd-test.component.html',
  styleUrls: ['./mskd-test.component.css']
})
export class MskdTestComponent implements OnInit {

  pagesFactories: Array<PagesFactory>;
  error;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.pagesFactories = [];

    this.dataService.getLocalReportData('mskd-test')
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
