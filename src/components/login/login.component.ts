import { AfterViewInit, Component, DestroyRef } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IGoogleLogin, ILoginRequest } from './models/login';
import { NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


interface CredentialResponse {
  credential: string;
  select_by: string;
}

interface GsiButtonConfiguration {
  theme?: 'outline' | 'filled_blue' | 'filled_black';
  size?: 'large' | 'medium' | 'small';
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin';
  shape?: 'rectangular' | 'pill' | 'circle' | 'square';
  logo_alignment?: 'left' | 'center';
  width?: number;
}

declare const google: {
  accounts: {
    id: {
      initialize: (options: {
        client_id: string;
        callback: (response: CredentialResponse) => void;
      }) => void;
      renderButton: (parent: HTMLElement, config: GsiButtonConfiguration) => void;
    };
  };
};


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements AfterViewInit {
  loginform! : FormGroup;

  constructor(private router: Router, private authService: AuthService, private http : HttpClient,private destoryRef : DestroyRef) {}

  

  ngAfterViewInit(): void {
    const checkGoogleLoaded = setInterval(() => {
      if (google && document.getElementById('google-button')) {
        clearInterval(checkGoogleLoaded); // Stop checking after success
  
        google.accounts.id.initialize({
          client_id: '489575766377-as3pkncpu62lj5htt2jsrs89t8n2g1rm.apps.googleusercontent.com',
          callback: this.handleCredentialResponse.bind(this),
        });
  
        google.accounts.id.renderButton(
          document.getElementById('google-button') as HTMLElement,
          {
            theme: 'outline',
            size: 'large',
            text: 'signin_with',
            shape: 'rectangular',
            logo_alignment: 'left',
          }
        );

      }
    }, 100); // Check every 100ms
  }


  handleCredentialResponse(response: CredentialResponse) {
    const googleObj : IGoogleLogin = {
        idToken : response.credential
    }
    this.authService.googleLogin(googleObj).pipe(takeUntilDestroyed(this.destoryRef)).subscribe({
      next: (userExists) => {
        if (userExists) {
          this.router.navigate(['/list']);
        }
      },
      error: (error) => {
        console.error('Google login failed:', error);
      }
    })
  }

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
      const data: ILoginRequest = {
        email: this.f?.['email'].value ?? '',
        password: this.loginForm.controls.password.value ?? '',
      };

      this.authService.login(data).pipe(takeUntilDestroyed(this.destoryRef)).subscribe({
        next : (userExists) => {
          if(userExists)
          {
              this.router.navigate(['/list']);
          }
        }
      })     
    }}
}
