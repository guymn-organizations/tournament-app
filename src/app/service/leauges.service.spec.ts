import { TestBed } from '@angular/core/testing';

import { LeaugesService } from './leauges.service';

describe('LeaugesService', () => {
  let service: LeaugesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaugesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
