import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [
    AuthController
  ],
  providers: [AuthService, PrismaService],
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('SECRET_KEY'),
        global: true,
        signOptions: {
          expiresIn: '5d',
        }
      }),
      inject: [ConfigService]
    })
  ]
})
export class AuthModule { }
