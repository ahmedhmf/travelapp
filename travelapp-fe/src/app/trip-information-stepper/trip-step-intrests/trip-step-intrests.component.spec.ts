import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripStepIntrestsComponent } from './trip-step-intrests.component';

describe('TripStepIntrestsComponent', () => {
  let component: TripStepIntrestsComponent;
  let fixture: ComponentFixture<TripStepIntrestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripStepIntrestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripStepIntrestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
