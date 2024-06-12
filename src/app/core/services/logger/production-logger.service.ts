import { Injectable } from '@angular/core';
import { ILogger } from './logger.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductionLoggerService implements ILogger {

  constructor() { }

  log(message: string): void {
    console.log(`LOG: ${message}`);
  }

  info(message: string): void {
    console.info(`INFO: ${message}`);
  }

  warn(message: string): void {
    console.warn(`WARN: ${message}`);
  }

  error(message: string): void {
    console.error(`ERROR: ${message}`);
  }
}
