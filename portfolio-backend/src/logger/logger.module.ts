import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyLoggerService } from './logger.service';
import { GlobalLogger } from './entities/logger.global';
import { GraphqlLogger } from './entities/logger.graphql';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([
    GlobalLogger,
    GraphqlLogger,
  ])],
  providers: [MyLoggerService],
  exports: [MyLoggerService],
})
export class LoggerModule {}
