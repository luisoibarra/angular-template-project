import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ILogger } from './services/logger/logger.interface';
import { environment } from '../../../environments/environment';
import { ProductionLoggerService } from './services/logger/production-logger.service';
import { DevelopLoggerService } from './services/logger/develop-logger.service';
import { HttpClientService } from './services/http-client/http-client.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './interceptors/auth.interceptor.service';

const loggerProvider: Provider = {
  provide: ILogger,
  useClass: environment.production ? ProductionLoggerService : DevelopLoggerService,
}

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    loggerProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
    }
  ]
})
export class CoreModule { }
