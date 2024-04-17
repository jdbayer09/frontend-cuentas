import { HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { StorageKeys } from '../../enums';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private storage = inject(StorageService);
  private messageSV = inject(MessageService);

  public getHeaders(): HttpHeaders {
    const token = this.storage.get<string>(StorageKeys.USER_INFO_TOKEN);
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${ token }`);
  }

  public setMessage(tittle: string, message: string, severity: 'success' | 'info' | 'error' | 'warn') {
    this.messageSV.add({
      key: 'cuentas-alerts',
      severity,
      detail: message,
      summary: tittle,
      life: 10000
    });
  }
}
