// jwt-access.module.ts
import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JWtRefreshToken } from '../utils/jwt.utils';

@Global()
@Module({
  imports: [JwtModule.register(JWtRefreshToken)],
  exports: [JwtModule],
})
export class JwtRefreshModule {}
