import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../../utils/custom-validators';
import { AuthService } from '../../services/auth.service';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { HashService } from '../../../project/shared/hash/services/hash.service';
import { IUserRegistration } from '../../interfaces/userRegistration';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup(
    {
      email: new FormControl(null, [Validators.required, Validators.email]),
      userName: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
        ),
      ]),
      passwordConfirm: new FormControl(null, [Validators.required]),
    },
    {
      validators: [
        CustomValidators.strongPassword,
        CustomValidators.passwordsMatching,
      ],
    }
  );

  errorMessage!: string;

  constructor(private router: Router, private authService: AuthService, private hashService: HashService) {}

  ngOnInit(): void {}

  async register() {
    if (!this.registerForm.valid) {
      return;
    }
    var registerData:IUserRegistration =
    {
      email: String(this.registerForm.value.email),
      userName: String(this.registerForm.value.userName),
      firstName: String(this.registerForm.value.firstName),
      lastName: String(this.registerForm.value.lastName),
      password: await this.hashService.generateHash(String(this.registerForm.value.password))
    }

    this.authService.register(registerData).subscribe({
      next: (user) => {
        console.log(user);
        this.router.navigate(['account/login']);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        console.log(err.error);
      },
    });
  }
}
