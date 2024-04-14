import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/security/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private authSV = inject(AuthService);

  constructor() {
    this.authSV.login('jdbayer09@gmail.com', '43522365').subscribe({
      next: resp => {
        console.log(resp);
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
