import { HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { StorageService } from './storage.service';
import { StorageKeys } from '../../enums';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  private storage = inject(StorageService);

  public getHeaders(): HttpHeaders {
    const token = this.storage.get<string>(StorageKeys.USER_INFO_TOKEN);
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${ token }`);
  }
}
