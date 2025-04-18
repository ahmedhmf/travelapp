import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripStepPreferencesComponent } from './trip-step-preferences.component';

describe('TripStepPreferencesComponent', () => {
  let component: TripStepPreferencesComponent;
  let fixture: ComponentFixture<TripStepPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripStepPreferencesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripStepPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
