import {Component, inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatStepperModule} from "@angular/material/stepper";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {TripStepDetailsComponent} from "./trip-step-details/trip-step-details.component";
import {TripStepTravelersComponent} from "./trip-step-travelers/trip-step-travelers.component";
import {TripStepStyleComponent} from "./trip-step-style/trip-step-style.component";
import {TripStepIntrestsComponent} from "./trip-step-intrests/trip-step-intrests.component";
import {TripStepSpecialNotesComponent} from "./trip-step-special-notes/trip-step-special-notes.component";
import {TripStepLoadComponent} from "./trip-step-load/trip-step-load.component";
import {TripStepChoicesComponent} from "./trip-step-choices/trip-step-choices.component";
import {TripStepGeneratePlanComponent} from "./trip-step-generate-plan/trip-step-generate-plan.component";
import {MatDialog} from "@angular/material/dialog";
import {TripWizardComponent} from "../trip-wizard/trip-wizard.component";

@Component({
  selector: 'app-trip-information-stepper',
  standalone: true,
  imports: [MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule, TripStepDetailsComponent, TripStepTravelersComponent, TripStepStyleComponent, TripStepIntrestsComponent, TripStepSpecialNotesComponent, TripStepLoadComponent, TripStepChoicesComponent, TripStepGeneratePlanComponent],
  templateUrl: './trip-information-stepper.component.html',
  styleUrl: './trip-information-stepper.component.css'
})
export class TripInformationStepperComponent {
  currentStep = 0;

  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }

  readonly dialog = inject(MatDialog);

  constructor() {
    this.dialog.open(TripWizardComponent, {
      width: '1280px',
      height: '605px',
      enterAnimationDuration: '500ms',
      exitAnimationDuration: '100ms',
      disableClose: true, // optional
      autoFocus: true,
      hasBackdrop: true,
      panelClass: 'custom-modalbox',
    });
  }
}
