import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripStyleCardComponent } from './trip-style-card.component';

describe('TripStyleCardComponent', () => {
  let component: TripStyleCardComponent;
  let fixture: ComponentFixture<TripStyleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripStyleCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripStyleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
