import {Component, input} from '@angular/core';
import {StepperItem} from "../../model/stepper-item.model";
import {StepperItemComponent} from "../stepper-item/stepper-item.component";

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    StepperItemComponent
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent {
  public steps= input.required<StepperItem[]>();
}
