import {Component, inject} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, NgIf, MatIconModule],
  templateUrl: './signup.component.html',
  styleUrl: '../auth-wrapper.scss'
})
export class SignupComponent {
  protected email = '';
  protected password = '';
  protected fullName = '';
  protected error: string | null = null;
  protected success = false;
  protected loading = false;
  protected showPassword = false;

  private auth = inject(AuthService);
  private router = inject(Router);

  signup() {
    this.error = null;
    this.loading = true;
    this.auth.signup(this.email, this.password, this.fullName).subscribe({
      next: () => {
        this.loading = false;
        this.success = true;
      },
      error: (err) => {
        this.loading = false;
        this.success = false;
        this.error = this.parseError(err);
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  private parseError(err: any): string {
    if (err.status === 422) {
      return 'Invalid email or password (must be at least 6 characters).';
    }
    if (err.status === 400 || err.status === 409) {
      return 'User already exists or email is invalid.';
    }
    if (err.error?.msg) {
      return err.error.msg;
    }
    if (typeof err.error === 'string') {
      return err.error;
    }
    return 'Something went wrong. Please try again.';
  }
}
