import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSpecComponent } from './report-spec.component';

describe('ReportSpecComponent', () => {
  let component: ReportSpecComponent;
  let fixture: ComponentFixture<ReportSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSpecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
