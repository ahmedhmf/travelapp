import {Component, computed, inject, input, signal} from '@angular/core';
import {CounterComponent} from "../../ui-components/counter/counter.component";
import {TripStyleCardComponent} from "../../ui-components/trip-style-card/trip-style-card.component";
import { tripDetailStore } from '../../stores/trip-wizard.store';

@Component({
  selector: 'app-trip-style',
  standalone: true,
  imports: [
    CounterComponent,
    TripStyleCardComponent
  ],
  templateUrl: './trip-style.component.html',
  styleUrls: ['./trip-style.component.css', '../wizard.style.css']
})
export class TripStyleComponent {
  protected tripDetailStore = inject(tripDetailStore);

  updateTripStyle(style: string) {
    this.tripDetailStore.updateTripStyle(style);
  }
}
