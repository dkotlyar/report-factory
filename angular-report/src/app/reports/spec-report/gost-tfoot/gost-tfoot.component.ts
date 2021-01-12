import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-gost-tfoot',
  templateUrl: './gost-tfoot.component.html',
  styleUrls: ['./gost-tfoot.component.css']
})
export class GostTfootComponent implements OnInit {

  @Input() name: string;
  @Input() note: string;
  @Input() numPage: number;
  @Input() numPages: number;

  constructor() { }

  ngOnInit(): void {
  }

}
