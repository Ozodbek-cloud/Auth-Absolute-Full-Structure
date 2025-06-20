// jwt-access.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWtRefreshToken } from '../utils/jwt.utils';

@Module({
  imports: [JwtModule.register(JWtRefreshToken)],
  exports: [JwtModule],
})
export class JwtRefreshModule {}
