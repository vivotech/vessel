import { TestBed } from '@angular/core/testing';

import { Vessel } from './vessel.service';

describe('Vessel', () => {
  let service: Vessel;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Vessel);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
