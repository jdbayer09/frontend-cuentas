import { Component, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserRequest } from '../../../interfaces/user/registerUserRequest.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  tittle = environment.public.tittle;
  info = environment.public.info;

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
      //TODO: Configuracion de servicio de registro.
    } else {
      setTimeout(() => {
        this._error.set("Las contraseñas deben ser iguales.");
        this._loading.set(false);
        this.registerForm.enable();
      }, 500);
    }
  }
}

