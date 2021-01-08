import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoremReportTemplateComponent } from './lorem-report-template.component';

describe('LoremReportTemplateComponent', () => {
  let component: LoremReportTemplateComponent;
  let fixture: ComponentFixture<LoremReportTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoremReportTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoremReportTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
