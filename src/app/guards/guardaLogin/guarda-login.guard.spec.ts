import { TestBed } from '@angular/core/testing';

import { GuardaLoginGuard } from './guarda-login.guard';

describe('GuardaLoginGuard', () => {
  let guard: GuardaLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GuardaLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
