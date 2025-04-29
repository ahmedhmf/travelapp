import {Component, input} from '@angular/core';
import {NgClass} from "@angular/common";
import {StepperItem} from "../../model/stepper-item.model";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-stepper-item',
  standalone: true,
  imports: [
    NgClass,
    MatIconModule
  ],
  templateUrl: './stepper-item.component.html',
  styleUrl: './stepper-item.component.scss'
})
export class StepperItemComponent {
  public item = input.required<StepperItem>();
}
