import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsksReportTemplateComponent } from './msks-report-template.component';

describe('MsksReportTemplateComponent', () => {
  let component: MsksReportTemplateComponent;
  let fixture: ComponentFixture<MsksReportTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsksReportTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsksReportTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
