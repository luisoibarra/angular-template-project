import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  firstValueFrom,
  flatMap,
  tap,
  throwError,
} from 'rxjs';
import { ILogin } from '../interfaces/login';
import { IUserRegistration } from '../interfaces/userRegistration';
import { IUser } from '../interfaces/user';
import { IAuthresult } from '../interfaces/authResult';
import { Router } from '@angular/router';
import { StorageService } from './storage.service';
import { ILoginResult } from '../interfaces/loginResult';

const AUTH_API = 'http://localhost:3000/v1/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers':
        'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
      Allow: 'GET, POST, OPTIONS, PUT, DELETE',
      Authorization: 'Bearer ' + String(this.storageService.getToken()),
    }),
  };

  httpOptionsToken = {
    headers: new HttpHeaders({
      Authorization: 'Bearer ' + String(this.storageService.getToken()),
    }),
  };
  errorMesage = '';
  @Output() logChange: EventEmitter<any> = new EventEmitter();

  async login(loginData: ILogin): Promise<any> {
    const tokenData: ILoginResult = await firstValueFrom(
      this.http.post<any>(AUTH_API + 'auth/login', loginData)
    );
    const token = tokenData.sessionToken;
    const refreshToken = tokenData.refreshToken;
    await this.storageService.saveToken(token as string);
    await this.storageService.saveRefreshToken(refreshToken as string);
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    const userData: IUser = await firstValueFrom(
      this.http.get<any>(AUTH_API + 'auth/profile', httpOptions)
    );
    // const authResult = tokenData.loggedUser;
    // const extractedUser: IUser = authResult.loggedUser;
    this.storageService.saveUser(userData);
    this.logChange.emit('login');
    // const userData = await firstValueFrom(this.http.get<any>(AUTH_API + 'auth/profile'));
    return userData;
  }

  async autoLogin():Promise< IUser | null> {
    var userData: IUser | null = null;
    const token = this.storageService.getToken();
    const refreshToken = this.storageService.getRefreshToken();

    await firstValueFrom(
      this.http.get<any>(AUTH_API + 'auth/profile', this.getBearerHeader(token as string))
    )
      .then((user) => {
        userData = user;
        console.log(userData);
        return userData;
      })
      .catch(async (err) => {
        console.log(err)

        try {
          var tokenData: ILoginResult = await firstValueFrom(
            this.http.get<any>(AUTH_API + 'auth/refresh', this.getBearerHeader(refreshToken as string))
          );
          console.log(tokenData);
          await this.storageService.saveToken(tokenData.sessionToken as string);
          await this.storageService.saveRefreshToken(
            tokenData.refreshToken as string
          );

          firstValueFrom(
           await this.http.get<any>(AUTH_API + 'auth/profile', this.getBearerHeader(tokenData.sessionToken as string))
          ).then((user) => {
            userData = user;
            return userData
          });
        } catch (err){
          console.log(err);
        }
      });

    return userData;
  }

  getBearerHeader(token:string){
    var httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };
    return httpOptions;
  }
  register(registerData: IUserRegistration): Observable<any> {
    try {
      return this.http.post(
        AUTH_API + 'user/register',
        registerData,
        this.httpOptions
      );
    } catch (error: any) {
      return throwError(() => new Error(error.error));
    }
  }

  logout() {
    this.storageService.clean();
    this.router.navigate(['account/login']);
    this.logChange.emit('logout');
  }
}
