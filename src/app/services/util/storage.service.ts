import { Injectable } from '@angular/core';
import { StorageKeys } from '../../enums';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }


  get<T>(key: StorageKeys): T | null {
    const data = localStorage.getItem(key.toString());
    if (!data) return null;
    return JSON.parse(data);
  }

  set(key: StorageKeys, value: any) {
    localStorage.setItem(key.toString(), JSON.stringify(value));
  }

  remove(key: StorageKeys) {
    localStorage.removeItem(key.toString());
  }

  clear() {
    localStorage.clear();
  }
}
