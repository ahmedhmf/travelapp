import {Component, input, output} from '@angular/core';
import {MatCheckboxChange, MatCheckboxModule} from "@angular/material/checkbox";

@Component({
  selector: 'app-image-button',
  standalone: true,
  imports: [MatCheckboxModule],
  templateUrl: './image-button.component.html',
  styleUrl: './image-button.component.scss'
})
export class ImageButtonComponent {
  image = input.required<string>();
  isCheckBox = input<boolean>(false);
  label = input.required<string>();
  buttonClick = output();
  checkBoxChecked = output<boolean>()

  onClick() {
    if (!this.isCheckBox()) {
      this.buttonClick.emit();
    }
  }

  checkBoxChanged(event: MatCheckboxChange) {
    this.checkBoxChecked.emit(event.checked);
  }
}
