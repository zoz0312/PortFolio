import { Logger } from '@nestjs/common';

export class MyLogger extends Logger {
  log(message, context): void {
    /* your implementation */
    console.log('log msg =>', message);
    console.log('log context=>', context)
  }
  error(message: string, trace: string) {
    // add your tailored logic here
    console.log('log error =>', message)
    super.error(message, trace);
  }
  warn(message: string) {
    console.log('log warn =>', message)
    /* your implementation */
  }
  debug(message: string) {
    console.log('log debug =>', message)
    /* your implementation */
  }
  verbose(message: string) {
    console.log('log verbose =>', message)
    /* your implementation */
  }
}