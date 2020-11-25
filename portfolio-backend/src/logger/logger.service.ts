import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { GraphqlLogger, LogLevel } from './entities/logger.graphql';
import { Injectable } from '@nestjs/common';

interface DefaultLog {
  message: string,
  context: string,
  user?: User,
  error?: string,
}

@Injectable()
export class MyLoggerService {
  constructor(
    @InjectRepository(GraphqlLogger)
    private readonly graphqlLogger: Repository<GraphqlLogger>,
  ) {};

  log({ message, context, user }: DefaultLog): void {
    const inputData = {
      message,
      logLevel: LogLevel.log
    };
    if (user) {
      inputData['userId'] = user.id;
    }
    if (context) {
      inputData['context'] = context;
    }
    this.graphqlLogger.save(this.graphqlLogger.create(inputData));
  }

  warning({ message, context, user }: DefaultLog) {
    const inputData = {
      message,
      logLevel: LogLevel.warning,
    };
    if (user) {
      inputData['userId'] = user.id;
    }
    if (context) {
      inputData['context'] = context;
    }
    this.graphqlLogger.save(this.graphqlLogger.create(inputData));
  }

  error({ message, context, user }: DefaultLog) {
    const inputData = {
      message,
      logLevel: LogLevel.error,
    };
    if (user) {
      inputData['userId'] = user.id;
    }
    if (context) {
      inputData['context'] = context;
    }
    this.graphqlLogger.save(this.graphqlLogger.create(inputData));
  }
}