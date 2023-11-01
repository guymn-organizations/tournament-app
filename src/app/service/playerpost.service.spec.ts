import { TestBed } from '@angular/core/testing';

import { PlayerpostService } from './playerpost.service';

describe('PlayerpostService', () => {
  let service: PlayerpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
