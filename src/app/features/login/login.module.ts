import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { CoreModule } from '../../core/core.module';
import { RouterModule, Routes } from '@angular/router';
import { LoginService } from './services/login/login.service';

export const routes: Routes = [
  { path: "", component: LoginPageComponent },
]

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    LoginService,
  ]
})
export class LoginModule { }
