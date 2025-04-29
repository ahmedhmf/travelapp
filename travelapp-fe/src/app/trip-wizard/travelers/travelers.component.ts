import {Component, computed, inject, signal} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatDatepickerToggle,
  MatDateRangeInput,
  MatDateRangePicker,
  MatEndDate,
  MatStartDate
} from "@angular/material/datepicker";
import {MatError, MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {CounterComponent} from "../../ui-components/counter/counter.component";
import {tripDetailStore} from "../../stores/trip-wizard.store";

@Component({
  selector: 'app-travelers',
  standalone: true,
  imports: [
    FormsModule,
    MatDateRangeInput,
    MatDateRangePicker,
    MatDatepickerToggle,
    MatEndDate,
    MatFormField,
    MatHint,
    MatLabel,
    MatStartDate,
    MatSuffix,
    ReactiveFormsModule,
    CounterComponent,
    MatError
  ],
  templateUrl: './travelers.component.html',
  styleUrls: ['./travelers.component.css', '../wizard.style.css']
})
export class TravelersComponent {
  protected tripDetailStore = inject(tripDetailStore);
  protected dirty = signal(false);
  protected error = computed(() => this.dirty() && (this.tripDetailStore.adults() + this.tripDetailStore.elders()) <= 0);

  onAdultAdded() {
    this.dirty.set(true);
    this.tripDetailStore.updateAdults(this.tripDetailStore.adults() + 1);
  }

  onAdultRemoved() {
    this.dirty.set(true);
    this.tripDetailStore.updateAdults(this.tripDetailStore.adults() - 1);
  }

  onElderAdded() {
    this.dirty.set(true);
    this.tripDetailStore.updateElders(this.tripDetailStore.elders() + 1);
  }

  onElderRemoved() {
    this.dirty.set(true);
    this.tripDetailStore.updateElders(this.tripDetailStore.elders() - 1);
  }

  onChildAdded() {
    this.dirty.set(true);
    this.tripDetailStore.updateChildren(this.tripDetailStore.children() + 1);
  }

  onChildRemoved() {
    this.dirty.set(true);
    this.tripDetailStore.updateChildren(this.tripDetailStore.children() - 1);
  }
}
