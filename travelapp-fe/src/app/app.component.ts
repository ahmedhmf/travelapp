import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'travelapp-fe';
  private matIconRegistry = inject(MatIconRegistry);
  private domSanitizer= inject(DomSanitizer);

  constructor(){
    this.matIconRegistry.addSvgIcon(
      "minus-button-icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/minus-button.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "plus-button-icon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../icons/plus-button.svg")
    );
  }
}
