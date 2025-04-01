import { TestBed } from '@angular/core/testing';

import { PipolService } from './pipol.service';

describe('PipolService', () => {
  let service: PipolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PipolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});