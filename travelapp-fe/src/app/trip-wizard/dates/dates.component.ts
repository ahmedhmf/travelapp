import {ChangeDetectionStrategy, Component, computed, inject, signal} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {
  DateRange,
  ExtractDateTypeFromSelection,
  MatDatepickerInputEvent,
  MatDatepickerModule
} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {provideNativeDateAdapter} from "@angular/material/core";
import {tripDetailStore} from "../../stores/trip-wizard.store";

@Component({
  selector: 'app-dates',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dates.component.html',
  styleUrls: ['./dates.component.css', '../wizard.style.css']
})
export class DatesComponent {
  protected tripDetailStore = inject(tripDetailStore);
  protected dirty = signal(false);
  protected error = computed(() => this.dirty() && (!this.tripDetailStore.startDate() || !this.tripDetailStore.endDate()));

  onStartDateChanged(event: MatDatepickerInputEvent<ExtractDateTypeFromSelection<DateRange<any>>, DateRange<any>>) {
    this.dirty.set(true);
    this.tripDetailStore.updateStartDate(event.value);
  }

  onEndDateChanged(event: MatDatepickerInputEvent<ExtractDateTypeFromSelection<DateRange<any>>, DateRange<any>>) {
    this.dirty.set(true);
    this.tripDetailStore.updateEndDate(event.value);
  }
}
