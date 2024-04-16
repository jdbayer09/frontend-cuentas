import { Component, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicUserService } from '../../../services/public/user.service';
import { environment } from '../../../../environments/environment';
import { ChangePassUserRequest } from '../../../interfaces/user/changePassRequest.interface';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.scss'
})
export class ChangePassComponent implements OnInit{


  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  private publicUserSV = inject(PublicUserService);
  private act = inject(ActivatedRoute);

  tittle = environment.public.tittle;
  info = environment.public.info;

  private _loading: WritableSignal<boolean> = signal(false);
  loading: Signal<boolean> = computed(() => this._loading());

  private _error: WritableSignal<string | null> = signal(null);
  error: Signal<string | null> = computed(() => this._error());

  private _successMessage: WritableSignal<string | undefined> = signal(undefined);
  successMessage: Signal<string | undefined> = computed(() => this._successMessage());

  private code: Signal<string> = computed(() => '');

  changePassForm: FormGroup = this.formBuilder.group({
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

  ngOnInit(): void {
    this.act.params.subscribe((resp: any) => {
      if (resp && resp.code) {
        this.code = computed(() => resp.code);
      } else {
        this._error.set('Error al modificar la contraseña.');
      }
    });
  }

  navLogin() {
    this.router.navigateByUrl('/p/login');
  }

  changePass() {
    this._error.set(null);
    this._loading.set(true);
    this.changePassForm.disable();
    const data: ChangePassUserRequest = this.changePassForm.value;
    if (data.password === data.confirmPassword) {
      this.publicUserSV.changePass(this.code(), data).subscribe({
        next: (resp) => {
          setTimeout(() => {
            this._loading.set(false);
            this._successMessage.set(resp.message);
            this.changePassForm.enable();
          }, 500);
        },
        error: err => {
          setTimeout(() => {
            this._error.set(err);
            this._loading.set(false);
            this.changePassForm.enable();
          }, 500);
        }
      });
    } else {
      setTimeout(() => {
        this._error.set("Las contraseñas deben ser iguales.");
        this._loading.set(false);
        this.changePassForm.enable();
      }, 500);
    }
  }
}
