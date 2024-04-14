import { Component, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/security/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

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

  tittle = environment.public.tittle;
  info = environment.public.info

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

  login() {
    this._error.set(null);
    this._loading.set(true);
    const { email, password } = this.loginForm.value;
    this.authSV.login(email, password).subscribe({
      next: () => {
        setTimeout(() => {
          this._loading.set(false);
          this.router.navigateByUrl('/z/dashboard', {replaceUrl: true});
        }, 500);
      },
      error: err => {
        setTimeout(() => {
          this._error.set(err);
          this._loading.set(false);
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
