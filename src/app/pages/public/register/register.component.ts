import { Component, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserRequest } from '../../../interfaces/user';
import { PublicUserService } from '../../../services/public/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private publicUserSV = inject(PublicUserService);

  private _loading: WritableSignal<boolean> = signal(false);
  loading: Signal<boolean> = computed(() => this._loading());

  private _error: WritableSignal<string | null> = signal(null);
  error: Signal<string | null> = computed(() => this._error());

  private _successMessage: WritableSignal<string | undefined> = signal(undefined);
  successMessage: Signal<string | undefined> = computed(() => this._successMessage());

  registerForm: FormGroup = this.formBuilder.group({
    name: [
      '',
      [
        Validators.required,
      ]
    ],
    lastName: [
      '',
      [
        Validators.required,
      ]
    ],
    email: [
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
    confirmPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],
  });

  navLogin() {
    this.router.navigateByUrl('/p/login');
  }

  register() {
    this._error.set(null);
    this._loading.set(true);
    this.registerForm.disable();
    const data: RegisterUserRequest = this.registerForm.value;
    if (data.password === data.confirmPassword) {
      this.publicUserSV.register(data).subscribe({
        next: (resp) => {
          setTimeout(() => {
            this._loading.set(false);
            this._successMessage.set(resp.message);
            this.registerForm.enable();
          }, 500);
        },
        error: err => {
          setTimeout(() => {
            this._error.set(err);
            this._loading.set(false);
            this.registerForm.enable();
          }, 500);
        }
      });
    } else {
      setTimeout(() => {
        this._error.set("Las contraseñas deben ser iguales.");
        this._loading.set(false);
        this.registerForm.enable();
      }, 500);
    }
  }
}

