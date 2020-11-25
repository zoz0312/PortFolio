import { User } from 'src/users/entities/user.entity';

interface DefaultLog {
  message: string,
  user?: User,
}

export class MyLogger {
  context?: string;

  constructor(
    context?: string
  ) {
    this.context = context;
  };

  log(log: DefaultLog): void {
    // Insert DB
    console.log('log', log);
    console.log('context', this.context)
  }

  error(log: DefaultLog) {
    // add your tailored logic here
    // console.log('log error =>', message)
    // super.error(message, trace);
  }

  warn(log: DefaultLog) {
    // console.log('log warn =>', message)
    /* your implementation */
  }
}