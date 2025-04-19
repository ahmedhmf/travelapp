import {Component, EventEmitter, inject, Output} from '@angular/core';
import {tripDetailStore} from "../../stores/trip-wizard.store";
import {TripInformationStepperService} from "../trip-information-stepper.service";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatIcon} from "@angular/material/icon";
import {ImageButtonComponent} from "../../ui-components/image-button/image-button.component";

@Component({
  selector: 'app-trip-step-special-notes',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule, MatSelect, MatOption, MatCheckbox, MatIcon, ImageButtonComponent
  ],
  templateUrl: './trip-step-special-notes.component.html',
  styleUrl: './trip-step-special-notes.component.scss'
})
export class TripStepSpecialNotesComponent {
  @Output() back = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  protected tripStore = inject(tripDetailStore);
  private tripInformationStepperService = inject(TripInformationStepperService);

  updateSpecialNotes(event: Event) {
    const element = this.tripInformationStepperService.getHtmlInputElement(event)
    this.tripStore.updateNotes(element.value);
  }
}
