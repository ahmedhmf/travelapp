import {AfterViewInit, Component, input} from '@angular/core';
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-trip-style-card',
  standalone: true,
  imports: [
    MatIconModule,
    NgStyle
  ],
  templateUrl: './trip-style-card.component.html',
  styleUrl: './trip-style-card.component.scss'
})
export class TripStyleCardComponent {
  label = input.required<string>();
  desc = input.required<string>();
  icon = input.required<string>();
  active = input.required<boolean>();
}
