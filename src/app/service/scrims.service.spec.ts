import { TestBed } from '@angular/core/testing';

import { ScrimsService } from './scrims.service';

describe('ScrimsService', () => {
  let service: ScrimsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrimsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
