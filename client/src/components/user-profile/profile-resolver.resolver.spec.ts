import { TestBed } from '@angular/core/testing';

import { ProfileResolver } from './profile-resolver.resolver';

describe('ProfileResolverResolver', () => {
  let resolver: ProfileResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ProfileResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
