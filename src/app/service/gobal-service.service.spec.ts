import { TestBed } from '@angular/core/testing';

import { GobalServiceService } from './gobal-service.service';

describe('GobalServiceService', () => {
  let service: GobalServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GobalServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
