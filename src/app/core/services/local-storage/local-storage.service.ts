import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  static TOKEN_KEY: string = "auth-token-key";

  constructor() { }

  setString(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getString(key: string): string | null {
    return localStorage.getItem(key);
  }

  clearString(key: string): void {
    localStorage.removeItem(key);
  }

  exists(key: string): boolean {
    return !!this.getString(key);
  }
}
