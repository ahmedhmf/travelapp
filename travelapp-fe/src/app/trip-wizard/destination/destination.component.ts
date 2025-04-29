import {Component, computed, inject, OnDestroy, signal} from '@angular/core';
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {DatesComponent} from "../dates/dates.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {tripDetailStore} from "../../stores/trip-wizard.store";

@Component({
  selector: 'app-destination',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    DatesComponent,
    FormsModule,
    ReactiveFormsModule,
    MatError
  ],
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css', '../wizard.style.css']
})
export class DestinationComponent implements OnDestroy{
  protected tripDetailStore = inject(tripDetailStore);
  protected dirty=signal(false);
  protected error = computed(() => this.dirty() && !this.tripDetailStore.destination());
  onTextChanged(event: Event): void {
    const inputField = event.target as HTMLInputElement;
    this.dirty.set(true);
    this.tripDetailStore.updateDestination(inputField.value);
  }

  ngOnDestroy(): void {
    this.dirty.set(false);
  }
}
