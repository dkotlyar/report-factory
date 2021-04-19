import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MskdReportLargeComponent } from './mskd-report-large.component';

describe('MskdReportLargeComponent', () => {
  let component: MskdReportLargeComponent;
  let fixture: ComponentFixture<MskdReportLargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MskdReportLargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MskdReportLargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
