import { Module, Global, DynamicModule } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { CONFIG_OPTIONS } from '../common/common.variables';
import { JwtModuleOptions } from './jwt.interface';

@Module({})
@Global()
export class JwtModule {
  static forRoot(options: JwtModuleOptions): DynamicModule {
    return {
      module: JwtModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        JwtService,
      ],
      exports: [JwtService],
    }
  }
}
