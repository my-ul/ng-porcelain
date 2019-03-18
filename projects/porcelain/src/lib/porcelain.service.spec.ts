import { TestBed } from '@angular/core/testing';

import { PorcelainService } from './porcelain.service';

describe('PorcelainService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PorcelainService = TestBed.get(PorcelainService);
    expect(service).toBeTruthy();
  });
});
