import {Component, EventEmitter, inject, Output} from '@angular/core';
import {ImageButtonComponent} from "../../ui-components/image-button/image-button.component";
import {tripDetailStore} from "../../stores/trip-wizard.store";

@Component({
  selector: 'app-trip-step-choices',
  standalone: true,
    imports: [
        ImageButtonComponent
    ],
  templateUrl: './trip-step-choices.component.html',
  styleUrl: './trip-step-choices.component.css'
})
export class TripStepChoicesComponent {
  @Output() next = new EventEmitter<void>();

  protected tripStore = inject(tripDetailStore);

  locationChecked(name: string, checked: boolean) {
    const selectedPlaces = this.tripStore.selectedPlaces();
    if (checked) {
      selectedPlaces.push(name)
    } else {
      selectedPlaces.splice(selectedPlaces.indexOf(name), 1);
    }
  this.tripStore.updateSelectedPlaces(selectedPlaces);
  }
}
