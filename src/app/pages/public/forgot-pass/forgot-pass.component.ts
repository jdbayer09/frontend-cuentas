import { Component, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicUserService } from '../../../services/public/user.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.scss'
})
export class ForgotPassComponent {

  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private publicUserSV = inject(PublicUserService);

  private _loading: WritableSignal<boolean> = signal(false);
  loading: Signal<boolean> = computed(() => this._loading());

  private _error: WritableSignal<string | null> = signal(null);
  error: Signal<string | null> = computed(() => this._error());

  private _successMessage: WritableSignal<string | undefined> = signal(undefined);
  successMessage: Signal<string | undefined> = computed(() => this._successMessage());

  forgotPassForm: FormGroup = this.formBuilder.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ]
  });

  navLogin() {
    this.router.navigateByUrl('/p/login');
  }

  forgotPass() {
    this._error.set(null);
    this._loading.set(true);
    this.forgotPassForm.disable();
    const {email} = this.forgotPassForm.value;
    this.publicUserSV.forgotPass(email).subscribe({
      next: (resp) => {
        setTimeout(() => {
          this._loading.set(false);
          this._successMessage.set(resp.message);
          this.forgotPassForm.enable();
        }, 500);
      },
      error: err => {
        setTimeout(() => {
          this._error.set(err);
          this._loading.set(false);
          this.forgotPassForm.enable();
        }, 500);
      }
    });
  }
}
