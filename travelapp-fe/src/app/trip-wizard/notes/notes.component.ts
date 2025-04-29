import { Component } from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css', '../wizard.style.css']
})
export class NotesComponent {

}
