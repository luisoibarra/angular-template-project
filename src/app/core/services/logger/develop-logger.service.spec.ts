import { TestBed } from '@angular/core/testing';

import { DevelopLoggerService } from './develop-logger.service';

describe('DevelopLoggerService', () => {
  let service: DevelopLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DevelopLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
