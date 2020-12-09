import { TestBed } from '@angular/core/testing';

import { FriendProfileResolver } from './friend-profile.resolver';

describe('FriendProfileResolver', () => {
  let resolver: FriendProfileResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(FriendProfileResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
