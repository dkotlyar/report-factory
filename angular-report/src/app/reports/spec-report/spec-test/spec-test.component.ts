import { Component, OnInit } from '@angular/core';
import {PagesFactory} from "report-lib";
import {HttpErrorResponse} from "@angular/common/http";
import {SpecService} from "../../../services/spec.service";

@Component({
  selector: 'app-spec-test',
  templateUrl: './spec-test.component.html',
  styleUrls: ['./spec-test.component.css']
})
export class SpecTestComponent implements OnInit {

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
