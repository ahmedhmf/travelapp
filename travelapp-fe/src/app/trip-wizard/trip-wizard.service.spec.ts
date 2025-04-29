import { TestBed } from '@angular/core/testing';

import { TripWizardService } from './trip-wizard.service';

describe('TripWizardService', () => {
  let service: TripWizardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripWizardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
