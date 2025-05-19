import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ILogin } from '../../models/login';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    NgIf,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginform! : FormGroup;
  emailAndPasswordMatch = true;

  constructor(private router: Router, private authService: AuthService) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'),
    ]),
  });

  get f() {
    return this.loginForm.controls;
  }

  submitForm() {
    if (this.loginForm.valid) {
      const data: ILogin = {
        email: this.f?.['email'].value ?? '',
        password: this.loginForm.controls.password.value ?? '',
      };

      if (this.authService.login(data)) {
        this.emailAndPasswordMatch = true;
        this.router.navigate(['/list']);
      } else {
        this.emailAndPasswordMatch = false;
      }
    }
  }
}
