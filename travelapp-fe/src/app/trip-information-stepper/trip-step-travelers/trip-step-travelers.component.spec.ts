import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripStepTravelersComponent } from './trip-step-travelers.component';

describe('TripStepTravelersComponent', () => {
  let component: TripStepTravelersComponent;
  let fixture: ComponentFixture<TripStepTravelersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripStepTravelersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripStepTravelersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
