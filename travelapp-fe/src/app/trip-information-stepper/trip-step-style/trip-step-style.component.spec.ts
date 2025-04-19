import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripStepStyleComponent } from './trip-step-style.component';

describe('TripStepStyleComponent', () => {
  let component: TripStepStyleComponent;
  let fixture: ComponentFixture<TripStepStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripStepStyleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripStepStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
