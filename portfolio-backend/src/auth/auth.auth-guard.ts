import { CanActivate, Injectable } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { UsersService } from '../users/users.service';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AllowedRoles } from './auth.role-decorator';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    // switching context => graphql context
    const roles = this.reflector.get<AllowedRoles>(
      'roles',
      context.getHandler(),
    );

    if (!roles) {
      // Public Users [OR] Any Users
      return true;
    }

    const gqlContext = GqlExecutionContext.create(context).getContext();
    const token = gqlContext.token;

    if (!token) {
      return false;
    }

    const decoded = this.jwtService.verify(token.toString());
    if (typeof decoded === 'object' && decoded.hasOwnProperty('id')) {
      const { user } = await this.userService.findOne(decoded['id']);

      if (!user) {
        return false;
      }

      gqlContext['user'] = user;

      return roles.includes('Any') ? true : roles.includes(user.role);
    }

    return false;
  }
}