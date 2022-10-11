/* eslint-disable prettier/prettier */
import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private jwt: JwtService,
  ) {}

  async signup(user: Users, loggedInUser: Users): Promise<Users> {
    try {
      if (loggedInUser.role === 'admin') {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        return await this.userRepository.save(user);
      }
      throw new UnauthorizedException();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const foundUser = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    if (foundUser) {
      if (await bcrypt.compare(password, foundUser.password)) {
        const { password, ...result } = foundUser;
        return result;
      }

      return null;
    }
    return null;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwt.sign(payload),
    };
  }

  async update(user: Users, loggedInUser: Users, id: string): Promise<any> {
    if (loggedInUser.role === 'admin') {
      if (user.password)
        user.password = await bcrypt.hash(
          user.password,
          await bcrypt.genSalt(),
        );
      return this.userRepository.update(id, user);
    }
    throw new UnauthorizedException();
  }
}
