import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripStyleComponent } from './trip-style.component';

describe('TripStyleComponent', () => {
  let component: TripStyleComponent;
  let fixture: ComponentFixture<TripStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripStyleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
