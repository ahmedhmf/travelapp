import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripInformationStepperComponent } from './trip-information-stepper.component';

describe('TripInformationStepperComponent', () => {
  let component: TripInformationStepperComponent;
  let fixture: ComponentFixture<TripInformationStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripInformationStepperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripInformationStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
