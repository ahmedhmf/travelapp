import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripStepDetailsComponent } from './trip-step-details.component';

describe('TripStepDetailsComponent', () => {
  let component: TripStepDetailsComponent;
  let fixture: ComponentFixture<TripStepDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripStepDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripStepDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
