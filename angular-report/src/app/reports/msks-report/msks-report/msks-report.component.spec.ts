import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsksReportComponent } from './msks-report.component';

describe('MsksReportComponent', () => {
  let component: MsksReportComponent;
  let fixture: ComponentFixture<MsksReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsksReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsksReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
