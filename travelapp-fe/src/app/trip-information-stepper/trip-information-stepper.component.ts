import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {TripStepDetailsComponent} from "./trip-step-details/trip-step-details.component";
import {TripStepTravelersComponent} from "./trip-step-travelers/trip-step-travelers.component";
import {TripStepPreferencesComponent} from "./trip-step-preferences/trip-step-preferences.component";

@Component({
  selector: 'app-trip-information-stepper',
  standalone: true,
  imports: [MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule, TripStepDetailsComponent, TripStepTravelersComponent, TripStepPreferencesComponent,],
  templateUrl: './trip-information-stepper.component.html',
  styleUrl: './trip-information-stepper.component.css'
})
export class TripInformationStepperComponent {
  currentStep = 0;
  nextStep() { this.currentStep++; }
  previousStep() { this.currentStep--; }
}
