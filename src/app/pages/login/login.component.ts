import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <div class="login-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Login</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" />
              <mat-error *ngIf="loginForm.get('email')?.invalid && loginForm.get('email')?.touched">
                <span *ngIf="loginForm.get('email')?.errors?.['required']">Email is required.</span>
                <span *ngIf="loginForm.get('email')?.errors?.['email']">Enter a valid email.</span>
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="fill" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput formControlName="password" type="password" />
              <mat-error *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
                <span *ngIf="loginForm.get('password')?.errors?.['required']">Password is required.</span>
                <span *ngIf="loginForm.get('password')?.errors?.['minlength']">
                  Password must be at least 6 characters.
                </span>
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid">
              Login
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f5f5f5;
      }
      mat-card {
        width: 100%;
        max-width: 400px;
        padding: 1rem;
      }
      .full-width {
        width: 100%;
      }
      button {
        width: 100%;
        margin-top: 1rem;
      }
    `,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Simulating a successful login
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      // Check user credentials (replace this with actual API call in the future)
      if (email === 'admin@gmail.com' && password === 'password123') {
        localStorage.setItem('isLoggedIn', 'true'); // Store login state
        this.router.navigate(['/dashboard']); // Redirect to the dashboard
      } else {
        alert('Invalid login credentials!');
      }
    }
  }

}
