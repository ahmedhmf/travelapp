import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripStepSpecialNotesComponent } from './trip-step-special-notes.component';

describe('TripStepSpecialNotesComponent', () => {
  let component: TripStepSpecialNotesComponent;
  let fixture: ComponentFixture<TripStepSpecialNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripStepSpecialNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripStepSpecialNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
