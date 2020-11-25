import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    /* TODO: 전체 로깅 */
    // headers.host
    // headers['user-agent']
    // headers.referer
    // method
    // body
    next();
  }
}
