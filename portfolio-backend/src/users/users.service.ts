import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { invalidError, permossionError } from 'src/common/error-text';
import { Raw, Repository } from 'typeorm';
import { CreateUserInput, CreateUserOutput } from './dto/create-user.dto';
import { UpdateUserInput, UpdateUserOutput } from './dto/update-user.input';
import { User, UserRole } from './entities/user.entity';
import { errorUser } from './user-text';
import { FindUserInput, FindUserOutput } from './dto/find-user.dto';
import { FindUsersInput, FindUsersOutput } from './dto/find-usres.dto';
import { PAGE_NATION } from 'src/common/common.pagenation';
import { TOTAL_PAGES } from '../common/common.pagenation';
import { DeleteUserIntput, DeleteUserOutput } from './dto/delete-user.dto';
import { LoginInput, LoginOutput } from './dto/login-user.dto';
import { JwtService } from '../jwt/jwt.service';
import { MyLoggerService } from '../logger/logger.service';

@Injectable()
export class UsersService {
  contextName: string = UsersService.name;

  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly logger: MyLoggerService,
  ) {}

  async createUser(
    { email, name, password, role }: CreateUserInput
  ): Promise<CreateUserOutput> {
    try {
      const user = await this.users.findOne(
        { email },
      );
      if (user) {
        return {
          ok: false,
          error: errorUser.alreadyEmail,
        }
      }

      if (role === UserRole.Admin) {
        return {
          ok: false,
          error: invalidError,
        }
      }

      const createdUser = await this.users.save(
        this.users.create({
          email,
          name,
          password,
          role,
        })
      );

      this.logger.log({
        message: `${createdUser.email} 유저 생성완료`,
        context: this.contextName,
      });

      return {
        ok: true,
      }
    } catch (error) {
      this.logger.error({
        message: `유저 생성 실패`,
        context: this.contextName,
        error,
      });
      return {
        ok: false,
        error: permossionError,
      }
    }
  }

  async findAll(
    user: User,
    findUsersInput: FindUsersInput,
  ): Promise<FindUsersOutput> {
    try {
      const { email, role } = findUsersInput;
      const where = {};

      if (email) {
        if (email.length < 3) {
          return {
            ok: false,
            error: errorUser.searchLength,
          }
        }
        where['email'] = Raw(userEmail => `${userEmail} ILIKE '%${email}%'`);
      }

      if (role) {
        where['role'] = role;
      }

      const [users, totalResults] = await this.users.findAndCount({
        where,
        ...PAGE_NATION(findUsersInput.page),
        order: { id: 'ASC' }
      });

      this.logger.log({
        message: 'Find User All',
        context: this.contextName,
        user,
      });

      return {
        ok: true,
        users,
        totalResults,
        totalPages: TOTAL_PAGES(totalResults),
      }
    } catch (error) {
      this.logger.error({
        message: `전체유저 찾기 실패`,
        context: this.contextName,
        error,
      });
      return {
        ok: false,
        error: permossionError,
      }
    }
  }

  async findUser(
    { id }: FindUserInput
  ): Promise<FindUserOutput> {
    try {
      const findUser = await this.users.findOneOrFail({ id });
      this.logger.log({
        message: 'Find User',
        context: this.contextName,
      });
      return {
        ok: true,
        user: findUser,
      }
    } catch (error) {
      this.logger.error({
        message: `유저 찾기 실패`,
        context: this.contextName,
        error,
      });
      return {
        ok: false,
        error: permossionError,
      }
    }
  }

  async findById(id: number) {
    try {
      const findUser = await this.users.findOne({ id });
      return { user: findUser }
    } catch {
      return { user: undefined }
    }
  }

  async update(
    user: User,
    { id, password, email, name, role, }: UpdateUserInput
  ): Promise<UpdateUserOutput> {
    try {
      const findUser = await this.users.findOne({ id });

      if (!findUser) {
        this.logger.log({
          message: `업데이트 유저 검색 실패`,
          context: this.contextName,
          user,
        });
        return {
          ok: false,
          error: errorUser.noUser,
        }
      }

      if (findUser.id !== user.id) {
        this.logger.log({
          message: `다른 유저 업데이트 시도`,
          context: this.contextName,
          user,
        });
        return {
          ok: false,
          error: errorUser.noUpdatePermission,
        }
      }

      if (email) {
        findUser.email = email;
      }

      if (name) {
        findUser.name = name;
      }

      if (role) {
        if (role === UserRole.Admin) {
          return {
            ok: false,
            error: invalidError,
          }
        }
        findUser.role = role;
      }

      if (password) {
        // Validation password
        findUser.password = password;
      }

      const modifiedUser = await this.users.save(findUser);

      this.logger.log({
        message: `${modifiedUser.email} 유저 수정완료`,
        context: this.contextName,
        user,
      });

      return {
        ok: true,
      }
    } catch (error) {
      this.logger.error({
        message: `유저 업데이트 실패`,
        context: this.contextName,
        error,
      });
      return {
        ok: false,
        error: permossionError,
      }
    }
  }

  async deleteUser(
    user: User,
    { id }: DeleteUserIntput,
  ): Promise<DeleteUserOutput> {
    try {
      const findUser = await this.users.findOne({ id });

      if (!findUser) {
        this.logger.log({
          message: `삭제 유저 검색 실패`,
          context: this.contextName,
          user,
        });
        return {
          ok: false,
          error: errorUser.noUser,
        }
      }

      if (findUser.id !== user.id) {
        this.logger.log({
          message: `다른 유저 삭제 시도`,
          context: this.contextName,
          user,
        });
        return {
          ok: false,
          error: errorUser.noDeletePermission,
        }
      }

      await this.users.softDelete({ id });

      this.logger.log({
        message: `${findUser.email} 유저 삭제 완료`,
        context: this.contextName,
        user,
      });

      return {
        ok: true,
      }
    } catch (error) {
      this.logger.error({
        message: `유저 삭제 실패`,
        context: this.contextName,
        error,
      });
      return {
        ok: false,
        error: permossionError,
      }
    }
  }

  async login(
    { email, password }: LoginInput,
  ): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne(
        { email },
        { select: ['id', 'password'] },
      );

      if (!user) {
        this.logger.log({
          message: `존재하지 않는 유저로 로그인 시도`,
          context: this.contextName,
        });
        return {
          ok: false,
          error: errorUser.wrongLogin,
        };
      }

      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        this.logger.log({
          message: `${user.email} 패스워드 오류`,
          context: this.contextName,
          user,
        });
        return {
          ok: false,
          error: errorUser.wrongLogin,
        };
      }

      const token = this.jwtService.sign({ id: user.id });
      this.logger.log({
        message: `${email} 로그인 성공`,
        context: this.contextName,
        user,
      });
      return {
        ok: true,
        token,
      }
    } catch (error) {
      this.logger.error({
        message: `로그인 에러 발생`,
        context: this.contextName,
        error,
      });
      return {
        ok:false,
        error: permossionError,
      }
    }
  }
}
