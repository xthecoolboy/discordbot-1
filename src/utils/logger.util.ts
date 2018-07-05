import { isEmpty } from "./isEmpty.util";

export interface ILogger {
  info(message: any, ...optionalParams: any[]): any;
  debug(message: any, ...optionalParams: any[]): any;
  warn(message: any, ...optionalParams: any[]): any;
  error(message: any, ...optionalParams: any[]): any;
}

export class Logger implements ILogger {

  constructor() { }

  public info(message: any, ...optionalParams: any[]): void {
    this.out(console.info, message, optionalParams);
  }
  public debug(message: any, ...optionalParams: any[]): void {
    this.out(console.debug, message, optionalParams);
  }
  public warn(message: any, ...optionalParams: any[]): void {
    this.out(console.warn, message, optionalParams);
  }
  public error(message: any, ...optionalParams: any[]): void {
    this.out(console.error, message, optionalParams);
  }

  private out(logger: any, message?: any, ...optionalParams: any[]) {
    if (!isEmpty(optionalParams) && optionalParams[0].length > 1) {
      logger(message, optionalParams);
    } else {
      logger(message);
    }
  }
}