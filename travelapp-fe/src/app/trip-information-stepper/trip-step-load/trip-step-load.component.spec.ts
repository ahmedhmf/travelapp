import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripStepLoadComponent } from './trip-step-load.component';

describe('TripStepLoadComponent', () => {
  let component: TripStepLoadComponent;
  let fixture: ComponentFixture<TripStepLoadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripStepLoadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripStepLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
