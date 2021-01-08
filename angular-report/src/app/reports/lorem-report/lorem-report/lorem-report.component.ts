import {Component, HostListener, OnInit} from '@angular/core';
import {PagesFactory} from '../../../../../projects/report-lib/src/lib/classes/pages-factory';
import {LOREM_DATA} from '../../../data/LOREM_DATA';

@Component({
  selector: 'app-lorem-report',
  templateUrl: './lorem-report.component.html',
  styleUrls: ['./lorem-report.component.css', '../../../app.component.css']
})
export class LoremReportComponent implements OnInit {

  pagesFactory: PagesFactory;

  @HostListener('window:resize')
  onZoom(): void {
    this.pagesFactory.reset();
  }

  constructor() { }

  ngOnInit(): void {
    this.pagesFactory = new PagesFactory(LOREM_DATA);
    this.pagesFactory.splitPages();
  }

}
