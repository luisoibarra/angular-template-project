import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private localStorage: LocalStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (!req.headers.has("Authorization")) {
      let token = this.localStorage.getString(LocalStorageService.TOKEN_KEY);
      if (token) {
        req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      }
    }

    return next.handle(req);
  }
}
