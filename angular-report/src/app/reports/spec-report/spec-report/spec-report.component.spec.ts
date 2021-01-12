import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecReportComponent } from './spec-report.component';

describe('SpecReportComponent', () => {
  let component: SpecReportComponent;
  let fixture: ComponentFixture<SpecReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
