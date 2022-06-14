import { TestBed } from '@angular/core/testing';

import { GetVerbsService } from './get-verbs.service';

describe('GetVerbsService', () => {
  let service: GetVerbsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetVerbsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
