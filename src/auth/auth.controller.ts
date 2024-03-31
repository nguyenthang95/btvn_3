import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { users } from '@prisma/client';
import { ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { ApiResponse } from 'src/api-dto/api-response.model';
import { UserLogin, UserBody } from 'src/api-dto/user.model';

@ApiTags("image")
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) { }

  @ApiBody({ type: UserLogin })
  @Post("/login")
  async login(@Body() body: UserLogin): Promise<ApiResponse<any>> {
    return await this.authService.login(body);
  }

  @ApiBody({ type: UserBody })
  @Post("/register")
  async register(@Body() user: users): Promise<ApiResponse<any>> {
    return await this.authService.register(user);
  }
}
