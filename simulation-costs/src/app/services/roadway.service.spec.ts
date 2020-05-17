import { TestBed } from '@angular/core/testing';

import { RoadwayService } from './roadway.service';

describe('RoadwayService', () => {
  let service: RoadwayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoadwayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
