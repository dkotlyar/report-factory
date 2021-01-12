import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GostTfootComponent } from './gost-tfoot.component';

describe('GostTfootComponent', () => {
  let component: GostTfootComponent;
  let fixture: ComponentFixture<GostTfootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GostTfootComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GostTfootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
