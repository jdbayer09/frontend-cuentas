import { Component, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/security/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authSV = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  private _loading: WritableSignal<boolean> = signal(false);
  loading: Signal<boolean> = computed(() => this._loading());

  private _error: WritableSignal<string | null> = signal(null);
  error: Signal<string | null> = computed(() => this._error());


  loginForm: FormGroup = this.formBuilder.group({
    email:    [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],
  });

  constructor() {
    localStorage.removeItem('LOGOUT');
  }

  login() {
    this._error.set(null);
    this._loading.set(true);
    this.loginForm.disable();
    const data: LoginRequest = this.loginForm.value;
    this.authSV.login(data).subscribe({
      next: () => {
        setTimeout(() => {
          this._loading.set(false);
          this.router.navigateByUrl('/z/dashboard', {replaceUrl: true});
          this.loginForm.enable();
        }, 500);
      },
      error: err => {
        setTimeout(() => {
          this._error.set(err);
          this._loading.set(false);
          this.loginForm.enable();
        }, 500);
      }
    });
  }

  navRegister() {
    this.router.navigateByUrl('/p/register');
  }

  navForgotPass() {
    this.router.navigateByUrl('/p/forgot-pass');
  }
}
