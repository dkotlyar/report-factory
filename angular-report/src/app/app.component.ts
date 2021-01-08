import {Component, HostListener, OnInit} from '@angular/core';
import {PagesFactory} from '../../projects/report-lib/src/lib/classes/pages-factory';
import {LOREM_DATA} from './data/LOREM_DATA';
import {ComputedStyles} from '../../projects/report-lib/src/lib/classes/computed-styles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() { }
}
