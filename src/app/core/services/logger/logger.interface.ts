import { Injectable } from "@angular/core";

@Injectable()
export abstract class ILogger {
    abstract log(message: string): void;
    abstract info(message: string): void;
    abstract warn(message: string): void;
    abstract error(message: string): void;
}
