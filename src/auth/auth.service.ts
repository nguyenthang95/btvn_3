import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { users } from '@prisma/client';
import { ApiResponse } from 'src/api-dto/api-response.model';
import { UserLogin } from 'src/api-dto/user.model';
import { PrismaService } from 'src/prisma/prisma.service';



@Injectable()
export class AuthService {

  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _jwtService: JwtService
  ) {
  }

  async login(userLogin: UserLogin): Promise<ApiResponse<any>> {
    const user = await this._prismaService.users.findFirst({
      where: {
        email: userLogin.email
      }
    });

    if (!user || user?.password !== userLogin.password) {
      return {
        data: null,
        statusCode: 400,
        message: "Email or password incorrect, Please try again."
      };
    }

    const token = await this._jwtService.signAsync({
      userId: user.user_id,
      fillName: user.full_name,
      email: user.email,
    })

    return {
      message: '',
      data: {
        user: user,
        token: token
      },
      statusCode: 200
    }
  }

  async register(user: users): Promise<ApiResponse<any>> {

    if (!await this._checkEmailExits(user?.email)) return {
      statusCode: 400,
      message: 'Email đã tồn tại hoặc không hợp lệ, Vui lòng thử lại',
      data: null
    }

    const data: users = {
      ...user
    }
    const entity = await this._prismaService.users.create({ data: data });

    return {
      data: entity,
      statusCode: 200,
      message: ''
    }
  }

  private async _checkEmailExits(email: string): Promise<boolean> {
    const user = await this._prismaService.users.findFirst({
      where: {
        email: email
      }
    });

    if (user) {
      return false
    }

    return true;
  }
}
