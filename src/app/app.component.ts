import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginPageComponent } from './features/login/components/login-page/login-page.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    LoginPageComponent, 
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-template-project';
}
