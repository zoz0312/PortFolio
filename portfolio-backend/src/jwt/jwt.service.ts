import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { CONFIG_OPTIONS } from '../common/common.variables';
import { JwtModuleOptions } from './jwt.interface';


@Injectable()
export class JwtService {
  constructor (
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions
  ) {}

  sign(payload: object): string {
    return jwt.sign(payload, this.options.privateKey);
  }

  verify(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
