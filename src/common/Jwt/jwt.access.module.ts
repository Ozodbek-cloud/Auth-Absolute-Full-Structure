import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessToken } from '../utils/jwt.utils';

@Module({
  imports: [JwtModule.register(JwtAccessToken)],
  exports: [JwtModule],
})
export class JwtAccessModule {}
