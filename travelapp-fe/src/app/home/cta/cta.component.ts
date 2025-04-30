import { Component } from '@angular/core';
import {MatButton, MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-cta',
  standalone: true,
  imports: [
    MatButtonModule
  ],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss'
})
export class CtaComponent {

}
