import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from 'src/common/models/user.models';
import { MailModule } from 'src/common/mail/mail.module';
import { JwtAccessModule } from 'src/common/Jwt/jwt.access.module';
import { JwtRefreshModule } from 'src/common/Jwt/jwt.refresh.module';

@Module({
  imports: [SequelizeModule.forFeature([Users]),
  MailModule, JwtAccessModule, JwtRefreshModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
