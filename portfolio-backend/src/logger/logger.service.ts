import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { GraphqlLogger } from './entities/logger.graphql';
import { Injectable } from '@nestjs/common';

interface DefaultLog {
  message: string,
  user?: User,
}

@Injectable()
export class MyLoggerService {
  context?: string;

  constructor(
    @InjectRepository(GraphqlLogger)
    private readonly graphqlLogger: Repository<GraphqlLogger>,
  ) {};

  log(log: DefaultLog): void {
    // Insert DB
    console.log('graphqlLogger,', this.graphqlLogger)
    // this.graphqlLogger.create();
    console.log('log', log);
    // console.log('context', this.context)
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

  setContext(context: string) {
    this.context = context;
  }
}