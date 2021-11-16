import { TestBed } from '@angular/core/testing';

import { GroupClientService } from './group-client.service';

describe('GroupClientService', () => {
  let service: GroupClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroupClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
