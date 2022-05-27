import { TestBed } from '@angular/core/testing';

import { ChatLogicService } from './chat-logic.service';

describe('ChatLogicService', () => {
  let service: ChatLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
