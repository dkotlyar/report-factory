import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempSpecComponent } from './temp-spec.component';

describe('TempSpecComponent', () => {
  let component: TempSpecComponent;
  let fixture: ComponentFixture<TempSpecComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempSpecComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempSpecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
