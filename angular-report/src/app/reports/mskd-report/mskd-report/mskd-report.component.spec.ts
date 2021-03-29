import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MskdReportComponent } from './mskd-report.component';

describe('MskdReportComponent', () => {
  let component: MskdReportComponent;
  let fixture: ComponentFixture<MskdReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MskdReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MskdReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
