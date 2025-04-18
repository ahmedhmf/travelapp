import {Component, EventEmitter, inject, Output} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOption, MatSelect, MatSelectChange} from "@angular/material/select";
import {MatCheckbox} from "@angular/material/checkbox";
import {tripDetailStore} from "../../stores/trip-wizard.store";
import {TripInformationStepperService} from "../trip-information-stepper.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-trip-step-preferences',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule, MatSelect, MatOption, MatCheckbox, MatIcon,],
  templateUrl: './trip-step-preferences.component.html',
  styleUrl: './trip-step-preferences.component.css'
})
export class TripStepPreferencesComponent {
  @Output() back = new EventEmitter<void>();

  protected tripStore = inject(tripDetailStore);
  private tripInformationStepperService = inject(TripInformationStepperService);

  interestList = ['Food', 'History', 'Shopping', 'Nature', 'Relaxation', 'Kid-friendly'];

  submit() {
    console.log('Final trip plan:', this.tripStore.tripData());
    // TODO: send to backend
  }

  updateTripStyle(event: MatSelectChange) {
    this.tripStore.updateTripStyle(event.value);
  }

  setInterest(intrest: string) {
    const interests = [...this.tripStore.interests()];
    const index = interests.indexOf(intrest);
    index === -1 ? interests.push(intrest) : interests.splice(index, 1);
    this.tripStore.updateInterests(interests);
  }

  updateSpecialNotes(event: Event) {
    const element = this.tripInformationStepperService.getHtmlInputElement(event)
    this.tripStore.updateNotes(element.value);
  }
}
