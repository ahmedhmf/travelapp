import {Component, EventEmitter, inject, Output} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {tripDetailStore} from "../../stores/trip-wizard.store";
import {TripInformationStepperService} from "../trip-information-stepper.service";
import {CounterComponent} from "../../ui-components/counter/counter.component";

@Component({
  selector: 'app-trip-step-travelers',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CounterComponent,
  ],
  templateUrl: './trip-step-travelers.component.html',
  styleUrl: './trip-step-travelers.component.css'
})
export class TripStepTravelersComponent {
  @Output() next = new EventEmitter<void>();
  @Output() back = new EventEmitter<void>();

  protected tripStore = inject(tripDetailStore);

  onAddAdult() {
    this.tripStore.updateAdults(this.tripStore.adults() + 1);
  }

  onRemoveAdult() {
    this.tripStore.updateAdults(this.tripStore.adults() - 1);
  }

  onAddElder() {
    this.tripStore.updateElders(this.tripStore.elders() + 1);
  }

  onRemoveElder() {
    this.tripStore.updateElders(this.tripStore.elders() - 1);
  }

  onAddchildren() {
    this.tripStore.updateChildren(this.tripStore.children() + 1);
    this.tripStore.updateChildAges([...this.tripStore.childAges(), 0]);
  }

  onRemovechildren() {
    this.tripStore.updateChildren(this.tripStore.children() - 1);
    this.tripStore.updateChildAges(this.tripStore.childAges().slice(0, -1));
  }

  counter(i: number) {
    return new Array(i);
  }

  onAddChildAge(i: number) {

  }

  onRemoveChildAge(i: number) {

  }
}
