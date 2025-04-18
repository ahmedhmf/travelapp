import { TestBed } from '@angular/core/testing';

import { TripInformationStepperService } from './trip-information-stepper.service';

describe('TripInformationStepperService', () => {
  let service: TripInformationStepperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripInformationStepperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
