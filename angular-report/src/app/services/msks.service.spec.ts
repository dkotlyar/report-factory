import { TestBed } from '@angular/core/testing';

import { MsksService } from './msks.service';

describe('MsksService', () => {
  let service: MsksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MsksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
