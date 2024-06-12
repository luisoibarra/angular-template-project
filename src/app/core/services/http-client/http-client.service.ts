import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  get<T>(url: string, headers: any = null, queryParameters: any = null) {
    return this.http.get<T>(url, {
      headers: headers,
      params: queryParameters,
    })
  }

  getAsync<T>(url: string, headers: any = null, queryParameters: any = null): Promise<T> {
    return firstValueFrom(this.get(url, headers, queryParameters));
  }

  post<T, D>(url: string, body: D, headers: any = null, queryParameters: any = null) {
    return this.http.post<T>(url, body, {
      headers: headers,
      params: queryParameters,
    })
  }

  postAsync<T, D>(url: string, body: D, headers: any = null, queryParameters: any = null): Promise<T> {
    return firstValueFrom(this.post(url, body, headers, queryParameters));
  }
}
