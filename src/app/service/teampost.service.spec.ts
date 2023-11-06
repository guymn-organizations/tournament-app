import { TestBed } from '@angular/core/testing';

import { TeampostService } from './teampost.service';

describe('TeampostService', () => {
  let service: TeampostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeampostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
