import * as CryptoJS from 'crypto-js'
import { EventEmitter, Injectable, Output } from '@angular/core';


@Injectable()
export class HashService {
  async generateHash(password: string): Promise<string> {
    return CryptoJS.SHA256(CryptoJS.enc.Hex.parse(password)).toString(CryptoJS.enc.Hex);
  }
}
