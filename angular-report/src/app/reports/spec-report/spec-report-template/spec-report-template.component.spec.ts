import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecReportTemplateComponent } from './spec-report-template.component';

describe('SpecReportTemplateComponent', () => {
  let component: SpecReportTemplateComponent;
  let fixture: ComponentFixture<SpecReportTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecReportTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecReportTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
