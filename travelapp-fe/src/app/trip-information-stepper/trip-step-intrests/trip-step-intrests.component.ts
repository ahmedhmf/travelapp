import {Component, EventEmitter, inject, Output} from '@angular/core';
import {ImageButtonComponent} from "../../ui-components/image-button/image-button.component";
import {tripDetailStore} from "../../stores/trip-wizard.store";

@Component({
  selector: 'app-trip-step-intrests',
  standalone: true,
  imports: [
    ImageButtonComponent
  ],
  templateUrl: './trip-step-intrests.component.html',
  styleUrl: './trip-step-intrests.component.scss'
})
export class TripStepIntrestsComponent {
  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  private tripStore = inject(tripDetailStore);

  addOrRemoveInterest(interest: string, checked: boolean) {
    const tripInterests = this.tripStore.interests();
    if (checked) {
      tripInterests.push(interest)
    } else {
      tripInterests.splice(tripInterests.indexOf(interest), 1);
    }
  }
}


