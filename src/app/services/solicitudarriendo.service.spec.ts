import { TestBed } from '@angular/core/testing';

import { SolicitudarriendoService } from './solicitudarriendo.service';

describe('SolicitudarriendoService', () => {
  let service: SolicitudarriendoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudarriendoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
