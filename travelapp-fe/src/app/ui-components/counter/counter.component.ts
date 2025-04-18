import {Component, input, output} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [MatButtonModule, MatIcon],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  value = input(0);
  allowLessThanZero = input(false);
  plusPressed = output();
  minusPressed = output();

  onPlusPressed() {
    this.plusPressed.emit();
  }

  onMinusPressed() {
    this.minusPressed.emit();
  }

  disableMinusButtonWhenLessThanZero() {
    return this.value() <= 0 && this.allowLessThanZero();
  }
}
