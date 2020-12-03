import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { CONFIG_OPTIONS } from '../common/common.variables';
import { JwtModuleOptions } from './jwt.interface';
import { MyLoggerService } from '../logger/logger.service';


@Injectable()
export class JwtService {
  contextName: string = JwtService.name;

  constructor (
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
    private readonly logger: MyLoggerService,
  ) {}

  sign(payload: object): string {
    this.logger.log({
      message: 'JWT 발급',
      context: this.contextName,
    })
    return jwt.sign(payload, this.options.privateKey);
  }

  verify(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
