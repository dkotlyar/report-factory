import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoremReportComponent } from './lorem-report.component';

describe('LoremReportComponent', () => {
  let component: LoremReportComponent;
  let fixture: ComponentFixture<LoremReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoremReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoremReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
