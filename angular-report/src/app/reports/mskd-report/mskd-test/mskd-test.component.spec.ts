import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MskdTestComponent } from './mskd-test.component';

describe('MskdTestComponent', () => {
  let component: MskdTestComponent;
  let fixture: ComponentFixture<MskdTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MskdTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MskdTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
