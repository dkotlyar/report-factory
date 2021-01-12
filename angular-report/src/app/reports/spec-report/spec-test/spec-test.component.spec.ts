import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecTestComponent } from './spec-test.component';

describe('SpecTestComponent', () => {
  let component: SpecTestComponent;
  let fixture: ComponentFixture<SpecTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
