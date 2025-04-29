import {Component, input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-interest-card',
  standalone: true,
    imports: [
        MatIcon
    ],
  templateUrl: './interest-card.component.html',
  styleUrl: './interest-card.component.scss'
})
export class InterestCardComponent {
  label = input.required<string>();
  icon = input.required<string>();
  active = input.required<boolean>();
}
