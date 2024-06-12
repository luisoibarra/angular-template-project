import { Component, OnInit, inject } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { HttpClientService } from '../../../../core/services/http-client/http-client.service';
import { LocalStorageService } from '../../../../core/services/local-storage/local-storage.service';

@Component({
  standalone: true,
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private httpService: HttpClientService,
    private localStorageService: LocalStorageService,) { }
  
  message: string = "";

  ngOnInit(): void {
    this.localStorageService.setString(LocalStorageService.TOKEN_KEY, "token");
    this.httpService.getAsync("https://swindrinks.com").then((x) => {
      this.message = "Success";
    });
  }
}
