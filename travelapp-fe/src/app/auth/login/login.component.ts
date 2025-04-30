import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule,MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: '../auth-wrapper.scss'
})
export class LoginComponent {

}
