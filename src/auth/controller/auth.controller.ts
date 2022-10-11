import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { AuthService } from '../service/auth.service';
import { Users } from '../user.entity';

@Controller('api/v1/auth/')
export class AuthController {
  constructor(private usersService: AuthService) {}

  @Post('signup')
  @UseGuards(JwtAuthGuard)
  async signup(@Request() req, @Body() user: Users): Promise<Users> {
    return this.usersService.signup(user, req.user);
  }
  @Post('update/:id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Request() req,
    @Body() user: Users,
    @Param('id') id: string,
  ): Promise<Users> {
    return this.usersService.update(user, req.user, id);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req): Promise<{ access_token: string }> {
    return this.usersService.login(req.user);
  }
}
