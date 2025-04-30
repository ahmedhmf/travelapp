import {Component, inject} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: '../auth-wrapper.scss'
})
export class SignupComponent {
  protected email = '';
  protected password = '';
  protected error = '';
  protected success = '';

  private auth = inject(AuthService);
  private router = inject(Router);

  signup() {
    this.auth.signup(this.email, this.password).subscribe({
      next: (res: any) => {
        this.success = 'Signup successful! Please log in.';
        this.error = '';
        // Optionally redirect or clear form
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = 'Signup failed. Try again.';
        this.success = '';
        console.error(err);
      }
    });
  }
}
