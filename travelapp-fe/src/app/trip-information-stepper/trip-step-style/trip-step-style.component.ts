import {Component, EventEmitter, inject, Output} from '@angular/core';
import {ImageButtonComponent} from "../../ui-components/image-button/image-button.component";
import {tripDetailStore} from "../../stores/trip-wizard.store";

@Component({
  selector: 'app-trip-step-style',
  standalone: true,
    imports: [
        ImageButtonComponent
    ],
  templateUrl: './trip-step-style.component.html',
  styleUrl: './trip-step-style.component.scss'
})
export class TripStepStyleComponent {
  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  private tripStore = inject(tripDetailStore);
  onBalancedClick() {
    this.tripStore.updateTripStyle('Balanced');
    this.next.emit();
  }

  onRelaxedClick() {
    this.tripStore.updateTripStyle('Relaxed');
    this.next.emit();
  }

  onFastClick() {
    this.tripStore.updateTripStyle('Fast');
    this.next.emit();
  }
}
