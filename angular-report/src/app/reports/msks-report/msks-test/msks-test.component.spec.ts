import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsksTestComponent } from './msks-test.component';

describe('MsksTestComponent', () => {
  let component: MsksTestComponent;
  let fixture: ComponentFixture<MsksTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsksTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MsksTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
