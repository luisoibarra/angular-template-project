import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ILogin } from '../../interfaces/login';
import { IUser } from '../../interfaces/user';
import { StorageService } from '../../services/storage.service';
import { HashService } from '../../../project/shared/hash/services/hash.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  errorMessage!: string;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private hashService: HashService
  ) {}

  ngOnInit() {
    var user = this.storageService.getUser();
    if (user) {
      this.router.navigate(['home']);
    }
  }

  ngOnDestroy() {
    // this.AuthUserSub.unsubscribe();
  }

  async login() {
    if (!this.loginForm.valid) {
      return;
    }

    var loginData:ILogin =
    {
      email : String(this.loginForm.value.email),
      password : await this.hashService.generateHash(String(this.loginForm.value.password))
    }
    this.authService.login(loginData).then(userData =>
      {
        this.router.navigate(['home']);
      })
      .catch(err =>{
        this.errorMessage = err;
      })
  }

  protected readonly console = console;
}
