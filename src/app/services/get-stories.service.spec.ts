import { TestBed } from '@angular/core/testing';

import { GetStoriesService } from './get-stories.service';

describe('GetStoriesService', () => {
  let service: GetStoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetStoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
