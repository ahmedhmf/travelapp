import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripStepGeneratePlanComponent } from './trip-step-generate-plan.component';

describe('TripStepGeneratePlanComponent', () => {
  let component: TripStepGeneratePlanComponent;
  let fixture: ComponentFixture<TripStepGeneratePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripStepGeneratePlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripStepGeneratePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
