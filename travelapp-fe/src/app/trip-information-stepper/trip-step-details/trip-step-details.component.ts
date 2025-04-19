import {Component, ElementRef, EventEmitter, inject, Output, ViewChild} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {tripDetailStore} from "../../stores/trip-wizard.store";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {TripInformationStepperService} from "../trip-information-stepper.service";
import {
  DateRange,
  ExtractDateTypeFromSelection,
  MatDatepickerInputEvent,
  MatDatepickerModule,
  MatDatepickerToggle,
  MatDateRangeInput
} from "@angular/material/datepicker";

@Component({
  selector: 'app-trip-step-details',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDateRangeInput,
    MatDatepickerToggle,
    MatDatepickerModule
  ],
  templateUrl: './trip-step-details.component.html',
  styleUrl: './trip-step-details.component.scss'
})
export class TripStepDetailsComponent {
  @ViewChild('destinationInput') destinationInput: ElementRef | undefined;
  @Output() next = new EventEmitter<void>();

  protected tripStore = inject(tripDetailStore);
  private tripInformationStepperService = inject(TripInformationStepperService);

  protected readonly startDate = new Date();

  updateDestination(event: Event) {
    const target = this.tripInformationStepperService.getHtmlInputElement(event);
    this.tripStore.updateDestination(target!.value);
  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    this.tripStore.updateStartDate(dateRangeStart.value);
    this.tripStore.updateEndDate(dateRangeEnd.value);
  }
}
