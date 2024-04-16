import { Component, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicUserService } from '../../../services/public/user.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.scss'
})
export class ActivateComponent implements OnInit {

  private router = inject(Router);
  private act = inject(ActivatedRoute);
  private publicUserSV = inject(PublicUserService);

  tittle = environment.public.tittle;
  info = environment.public.info;


  private _error: WritableSignal<string | null> = signal(null);
  error: Signal<string | null> = computed(() => this._error());

  private _successMessage: WritableSignal<string | undefined> = signal(undefined);
  successMessage: Signal<string | undefined> = computed(() => this._successMessage());

  private _loading: WritableSignal<boolean> = signal(true);
  loading: Signal<boolean> = computed(() => this._loading());

  ngOnInit(): void {
    this.act.params.subscribe((resp: any) => {
      if (resp && resp.code) {
        setTimeout(() => {
          this.publicUserSV.activate(resp.code).subscribe({
            next: (resp) => {
              this._loading.set(false);
              this._successMessage.set(resp.message);
            },
            error: err => {
              this._error.set(err);
              this._loading.set(false);
            }
          });
        }, 500);
      } else {
        this._error.set('Error al activar usuario.');
        this._loading.set(false);
      }
    });
  }


  navLogin() {
    this.router.navigateByUrl('/p/login');
  }
}
