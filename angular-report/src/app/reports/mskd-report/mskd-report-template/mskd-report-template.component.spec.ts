import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MskdReportTemplateComponent } from './mskd-report-template.component';

describe('MskdReportTemplateComponent', () => {
  let component: MskdReportTemplateComponent;
  let fixture: ComponentFixture<MskdReportTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MskdReportTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MskdReportTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
