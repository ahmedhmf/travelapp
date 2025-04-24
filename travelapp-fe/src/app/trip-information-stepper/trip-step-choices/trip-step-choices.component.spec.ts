import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripStepChoicesComponent } from './trip-step-choices.component';

describe('TripStepChoicesComponent', () => {
  let component: TripStepChoicesComponent;
  let fixture: ComponentFixture<TripStepChoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripStepChoicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripStepChoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
